"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

import { ChartTypeRegistry } from "chart.js/auto";
import { useTheme } from "next-themes";

type GraphProps = {
  type: keyof ChartTypeRegistry;
  labels: string[];
  data: number[];
  width?: number; // Add width prop
  height?: number; // Add height prop
};

const Graph: React.FC<GraphProps> = ({ type, labels, data, width, height }) => {
  const { theme } = useTheme();
  const validChartTypes = [
    "line",
    "bar",
    "pie",
    "doughnut",
    "polarArea",
    "radar",
  ];

  if (!validChartTypes.includes(type)) {
    throw new Error(`Invalid chart type: ${type}`);
  }
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Reload the page or perform any other action when the screen size changes
        window.location.reload();
      }, 250); // Adjust the delay as needed
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: type,
          data: {
            labels: labels,
            datasets: [
              {
                label: "nombre d'inscrits",
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: theme === "dark" ? "red" : "black",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                beginAtZero: true,
                // backgroundColor: theme === "dark" ? "#000" : "#fff",
                ticks: {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: theme === "dark" ? "#fff" : "#000",
                  stepSize: 1,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      }
    }
  }, [theme]);

  return <canvas ref={chartRef} className="h-dvh max-h-96 w-full" />;
};

export default Graph;

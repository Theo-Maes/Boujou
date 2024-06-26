import React, { SVGProps } from "react";

interface MySvg extends SVGProps<SVGSVGElement> {
  title?: string;
}

export const CheckedMarckIcon: React.FC<MySvg> = (props) => (
  <svg
    aria-hidden="false"
    focusable="true"
    height={props.height ?? "24"}
    width={props.width ?? "24"}
    role="presentation"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{props.title ?? ""}</title>
    <path
      d="M4.5 12.75L10.5 18.75L19.5 5.25"
      stroke={props.color ?? "currentColor"}
      strokeWidth={props.stroke ?? "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

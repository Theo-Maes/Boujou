import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { useTheme } from "next-themes";

export interface InformationsEventProps {
    iconName: string;
    primaryInformation: string;
    secondaryInformation?: string;
    piIsLink?: Boolean;
    siIsLink?: Boolean;
}

export const InformationsEventCard: React.FC<InformationsEventProps> = ({ iconName, primaryInformation, secondaryInformation, piIsLink, siIsLink }) => {
    const { theme } = useTheme();

    return (
    <Card className="rounded-none mb-2">
        <CardBody className="flex flex-col bg-secondaryLight dark:bg-gray-800">
            <div className="flex flex-row">
                <div className="flex justify-center items-center">
                    <Image
                        className={theme === "dark" ? "ml-2 drop-shadow-lg invert" : "ml-2 drop-shadow-lg"}
                        src={`/${iconName}.svg`}
                        alt={`${iconName} icon`}
                        width={20}
                        height={20}
                    />
                </div>
                <div className="ml-5">
                    {piIsLink ? (
                        <Link href={primaryInformation} target="_blank" className="font-medium hover:underline underline-offset-4 dark:text-neutral-200 dark:hover:underline-neutral-200">{primaryInformation}</Link>
                    ) : (
                        <p className="font-medium">{primaryInformation}</p>
                    )}
                    {siIsLink && secondaryInformation ? (
                        <Link href={secondaryInformation} className="hover:underline underline-offset-4 dark:text-neutral-200 dark:hover:underline-neutral-200">{secondaryInformation}</Link>
                    ) : (
                        <p>{secondaryInformation}</p>
                    )}
                </div>
            </div>
        </CardBody>
    </Card>
  );
}
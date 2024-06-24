import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";

export interface UserGroupProps {
    chevron?: boolean,
    avatar: string;
    fullname: string;
}

export const UserGroup: React.FC<UserGroupProps> = ({ chevron, avatar, fullname }) => {
    const { theme } = useTheme();
    
    return (
        <div className="flex flex-row">
            {chevron ? (
               <div className="hidden md:flex justify-center items-center">
                    <Image
                        className={theme === "dark" ? "md:ml-2 mr-4 drop-shadow-lg invert" : "md:ml-2 mr-4 drop-shadow-lg"}
                        src="chevron-right.svg"
                        alt="chevron right icon"
                        width={16}
                        height={16}
                    />
                </div> 
            ) : (
                <></>
            )}
            <div className="flex justify-center items-center">
                <Image
                    className={theme === "dark" ? "ml-2 drop-shadow-lg" : "ml-2 drop-shadow-lg"}
                    src={`${avatar}`}
                    alt={`${fullname} avatar`}
                    width={30}
                    height={30}
                />
            </div>
            <div className="flex justify-center items-center ml-5">
                <p className="font-medium text-xs md:text-base">{fullname}</p>
            </div>
        </div>
    );
};

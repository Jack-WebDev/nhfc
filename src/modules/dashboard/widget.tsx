import { Button } from "@/components";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Widget = (props: Props) => {
  const { title, count, Icon, iconColor, bgColor, textColor, iconBgColor } = props;
  return (
    <div className={`w-80 flex flex-col  gap-4 shadow-md border border-gray-100 px-4 py-5 rounded-lg `} style={{backgroundColor: bgColor}}>
      <div className="flex items-center justify-between w-full">
        <div className={`flex flex-col gap-1 items-start w-fit`} style={{color: textColor}}>
          <h1 className="text-sm font-semibold">{title}</h1>
          <p className="text-sm font-normal">{count}</p>
        </div>
        <div className={`p-2 flex justify-center items-center w-fit h-fit rounded-full shadow-md`} style={{backgroundColor: iconBgColor}}>
          <Icon size={20} style={{color: iconColor}}/>
        </div>
      </div>

      
    </div>
  );
};

type Props = {
  title: string;
  count: number;
  Icon: React.ElementType,
  iconColor: string;
  bgColor: string;
  textColor: string;
  iconBgColor: string
};

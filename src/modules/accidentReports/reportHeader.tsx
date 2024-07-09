import React from "react";

export const ReportHeader = (props: Props) => {
  return (
    <div className="w-full flex flex-col p-4 h-fit  pb-2">
      <h1 className="w-full text-center text-lg font-bold">{props.title}</h1>
      <p className="text-sm font-semibold text-gray-500 w-full text-center">Period: <span className="text-blue-500 text-xs">{props.fromDate} - {props.toDate}</span></p>
    </div>
  );
};

type Props = {
  title: string;
  fromDate: string;
  toDate: string;
};

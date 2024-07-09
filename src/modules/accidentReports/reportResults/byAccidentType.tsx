"use client";

import { fetchAccidentReportByAccidentType } from "@/apiCalls";
import { Loader } from "@/components";
import url from "@/lib/apiUrl";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const ReportResultsByAccidentType = (props: Props) => {
  const [results, setResults] = useState<ResultsType>();
  const [loading, setLoading] = useState<boolean>(false);

  const { type, accidentType } = props;
  useEffect(() => {
    const fetchReport = async (type: string) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${url}/accidents/reports/accidentTypes?accidentType=${type}`
        );
        setResults(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchReport(accidentType);
  }, [props.accidentType]);

  const serious = results?.numberOfSeriouslyInjured!
  const slight = results?.numberOfSlightlyInjured!
  const noInjury = results?.numberOfNotInjured!
  const fatal = results?.numberOfDead!

  const value =
    results && type === "fatal"
      ? results?.numberOfDead
        ? results?.numberOfDead
        : 0
      : type === "serious"
      ? results?.numberOfSeriouslyInjured
        ? results?.numberOfSeriouslyInjured
        : 0
      : type === "slight"
      ? results?.numberOfSlightlyInjured
        ? results?.numberOfSlightlyInjured
        : 0
      : type === "noInjury"
      && results?.numberOfNotInjured
        ? results?.numberOfNotInjured
        : 0
      
      
  const total = serious + slight + noInjury + fatal

  return loading ? (
    <Loader
      size="xs"
      className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"
    />
  ) : (
    results && (
      <div className="w-full h-full">
        <p className="text-sm font-semibold">{type === "total" ? total : value}</p>
      </div>
    )
  );
};

type Props = {
  accidentType: string;
  type: string;
};

type ResultsType = {
  numberOfDead: number | null;
  numberOfSeriouslyInjured: number | null;
  numberOfSlightlyInjured: number | null;
  numberOfNotInjured: number | null;
};

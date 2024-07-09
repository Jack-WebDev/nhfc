
import { fetchAllBooks, fetchAllBooksByStatus, fetchAllNotices, fetchAllNoticesByStatus } from "@/apiCalls/batch";
import { Button } from "@/components";
import { Widget } from "@/modules/dashboard";
import { BookStatus } from "@prisma/client";
import { BookOpen, FileLineChart, FileText } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import DashboardCard from "./_components/DashboardCard";
import { FaFile, FaFileAlt, FaFileArchive, FaFileCode, FaFileContract, FaFileInvoice, FaFileInvoiceDollar, FaFilePrescription } from "react-icons/fa";

type Props = {};


const Page = async (props: Props) => {


  return (
    <div>
      <>
      <h2 className="text-3xl font-semibold my-12">Loan Applications</h2>
    <div className="grid grid-cols-4 grid-rows-2 gap-8">

        <DashboardCard icon={FaFileInvoice} total={2134} title="Applications"/>
        <DashboardCard icon={FaFile} total={874} title="Financially Vialble Applications"/>
        <DashboardCard icon={FaFileAlt} total={633} title="Approved Applications"/>
        <DashboardCard icon={FaFileContract} total={383} title="Declined Applications"/>
        <DashboardCard icon={FaFileInvoice} total={123} title="Appealed Applications"/>
        <DashboardCard icon={FaFileInvoiceDollar} total={123} title="Applications Declined Due to Misrepresentation of information"/>
        <DashboardCard icon={FaFilePrescription} total={123} title="Value of approved applications"/>
        <DashboardCard icon={FaFileContract} total={123} title="Value of home loans"/>
    </div>
      </>
      <>
      <h2 className="text-3xl font-semibold my-12">Queries</h2>
      <div className="grid grid-cols-4 gap-x-8">
      <DashboardCard icon={FaFileInvoice} total={2134} title="Total Queries"/>
        <DashboardCard icon={FaFile} total={874} title="Closed Queries"/>
        <DashboardCard icon={FaFileArchive} total={383} title="Cases"/>
        <DashboardCard icon={FaFileCode} total={123} title="Complaints"/>
      </div>
      </>
    </div>
  );
};

export default Page;

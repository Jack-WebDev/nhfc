import { BarChartComponent } from "./_components/BarChart";
import DashboardCard from "./_components/DashboardCard";

import db from "@/utils/connect";
import { PieChartComponent } from "./_components/PieChart";
import { LineChartComponent } from "./_components/LineChart";
import { FinanceSolutionsChartComponent } from "./_components/FinanceSolutionsChart";
import { LayoutTemplateIcon } from "lucide-react";
import { PageHeader } from "@/components";

const Page = async () => {
  const totalApplications = await db.applications.count();
  const totalApprovedApplications = await db.applications.count({
    where: {
      LoanStatus: "Approved",
    },
  });
  const totalDeclinedApplications = await db.applications.count({
    where: {
      LoanStatus: "Rejected",
    },
  });
  const totalPendingApplications = await db.applications.count({
    where: {
      LoanStatus: "Pending",
    },
  });
  const totalQueries = await db.queries.count();
  const totalOpenQueries = await db.queries.count({
    where: {
      queryStatus: "Open",
    },
  });
  const totalClosedQueries = await db.queries.count({
    where: {
      queryStatus: "Closed",
    },
  });

  return (
    <div>
      <>
        <PageHeader Icon={LayoutTemplateIcon} title="Dashboard Overview" />
        <div className="grid grid-cols-4 grid-rows-2 gap-8 mt-12">
          <DashboardCard
            total={totalApplications}
            title="Total Applications"
            styling="green"
            report="↑ 5.2% from last month"
          />

          <DashboardCard
            total={totalPendingApplications}
            title="Pending Applications"
            styling="red"
            report="↓ 2.1% from last month"
          />
          <DashboardCard
            total={totalApprovedApplications}
            title="Approved Applications"
            styling="green"
            report="↑ 7.8% from last month"
          />
          <DashboardCard
            total={totalDeclinedApplications}
            title="Declined Applications"
            styling="red"
            report="↑ 1.5% from last month"
          />

          <DashboardCard
            total={"384.1M"}
            title="Value of approved applications"
            styling="green"
            report="↑ 12.3% from last month"
          />
          <DashboardCard
            total={"287,355"}
            title="Ave. Loan Amount"
            styling="green"
            report="↑ 3.5% from last month"
          />
          <DashboardCard
            total={"287,355"}
            title="Ave. Investment Amount"
            styling="green"
            report="↑ 2.8% from last month"
          />
        </div>
      </>
      <>
        <h2 className="text-3xl font-semibold my-12">
          Messaging Center Metrics
        </h2>
        <div className="grid grid-cols-4 gap-x-8">
          <DashboardCard total={totalQueries} title="Total Messages" />
          <DashboardCard total={totalOpenQueries} title="Open Messages" />
          <DashboardCard total={totalClosedQueries} title="Closed Messages" />
          <DashboardCard total={"40%"} title="Turn Around Time" />
        </div>
        <div className="grid grid-cols-2 gap-8 my-12">
  <div className="col-span-1">
    <BarChartComponent />
  </div>
  <div className="col-span-1">
    <FinanceSolutionsChartComponent />
  </div>
  <div className="col-span-2">
    <LineChartComponent />
  </div>
</div>

      </>
    </div>
  );
};

export default Page;

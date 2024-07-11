import { Component } from "./_components/Charts";
import DashboardCard from "./_components/DashboardCard";

import db from "@/utils/connect";

const Page = async () => {
  const totalApplications = await db.applications.count();
  const totalApprovedApplications = await db.applications.count({
    where: {
      LoanStatus: "Approved",
    },
  });
  const totalDeclinedApplications = await db.applications.count({
    where: {
      LoanStatus: "Declined",
    },
  });
  const totalPendingApplications = await db.applications.count({
    where: {
      LoanStatus: "Pending",
    },
  });

  return (
    <div>
      <>
        <h2 className="text-3xl font-semibold my-12">Dashboard Overview</h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-8">
          <DashboardCard total={totalApplications} title="Applications" />

          <DashboardCard
            total={totalApprovedApplications}
            title="Approved Applications"
          />
                    <DashboardCard
            total={totalPendingApplications}
            title="Pending Applications"
          />
          <DashboardCard
            total={totalDeclinedApplications}
            title="Declined Applications"
          />
          <DashboardCard total={123} title="Appealed Applications" />

          <DashboardCard total={123} title="Value of approved applications" />
          <DashboardCard total={123} title="Value of home loans" />
        </div>
      </>
      <>
        <h2 className="text-3xl font-semibold my-12">Queries</h2>
        <div className="grid grid-cols-4 gap-x-8">
          <DashboardCard total={2134} title="Total Queries" />
          <DashboardCard total={874} title="Closed Queries" />
          <DashboardCard total={383} title="Cases" />
          <DashboardCard total={123} title="Complaints" />
        </div>
        <Component/>
      </>
    </div>
  );
};

export default Page;

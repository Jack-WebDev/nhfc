import {
  BookOpenCheck,
  MountainSnow,
  ShieldCheck,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";

export default function ERM() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="grid grid-cols-2 gap-4">
        <Link
          href={"/dashboard/erm/register-risk"}
          className="border-2 border-gray-300 rounded-xl grid justify-items-center gap-y-2 p-4 bg-white hover:border-blue-500"
        >
          <BookOpenCheck size={40} />
          <h2 className="text-2xl font-medium">Risk Register</h2>
        </Link>

        <Link
          href={"/dashboard/erm/objectives"}
          className="border-2 border-gray-300 rounded-xl grid justify-items-center gap-y-2 p-4 bg-white hover:border-blue-500"
        >
          <MountainSnow size={40} />{" "}
          <h2 className="text-2xl font-medium">Objectives</h2>
        </Link>
        <Link
          href={"/dashboard/erm/risk-treatment"}
          className="border-2 border-gray-300 rounded-xl grid justify-items-center gap-y-2 p-4 bg-white hover:border-blue-500"
        >
          <ShieldCheck size={40} />
          <h2 className="text-2xl font-medium">Risk Treatments</h2>
        </Link>
        <Link
          href={"/dashboard/erm/risk-reporting"}
          className="border-2 border-gray-300 rounded-xl grid justify-items-center gap-y-2 p-4 bg-white hover:border-blue-500"
        >
          <FileBarChart size={40} />
          <h2 className="text-2xl font-medium">Risk Reporting</h2>
        </Link>
      </div>
    </div>
  );
}

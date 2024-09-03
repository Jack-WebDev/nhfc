import {
  BookOpenCheck,
  MountainSnow,
  ShieldCheck,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";

export default function ERM() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <Link
          href={"/dashboard/erm/register-risk"}
          className="transform transition-transform hover:-translate-y-2 hover:shadow-xl border-2 border-gray-200 rounded-xl grid justify-items-center gap-y-4 p-6 bg-white hover:border-blue-500 shadow-md"
        >
          <BookOpenCheck size={50} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Risk Register</h2>
        </Link>

        <Link
          href={"/dashboard/erm/objectives"}
          className="transform transition-transform hover:-translate-y-2 hover:shadow-xl border-2 border-gray-200 rounded-xl grid justify-items-center gap-y-4 p-6 bg-white hover:border-blue-500 shadow-md"
        >
          <MountainSnow size={50} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Objectives</h2>
        </Link>

        <Link
          href={"/dashboard/erm/risk-treatment"}
          className="transform transition-transform hover:-translate-y-2 hover:shadow-xl border-2 border-gray-200 rounded-xl grid justify-items-center gap-y-4 p-6 bg-white hover:border-blue-500 shadow-md"
        >
          <ShieldCheck size={50} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Risk Treatments</h2>
        </Link>

        <Link
          href={"/dashboard/erm/risk-reporting"}
          className="transform transition-transform hover:-translate-y-2 hover:shadow-xl border-2 border-gray-200 rounded-xl grid justify-items-center gap-y-4 p-6 bg-white hover:border-blue-500 shadow-md"
        >
          <FileBarChart size={50} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Risk Reporting</h2>
        </Link>
      </div>
    </div>
  );
}

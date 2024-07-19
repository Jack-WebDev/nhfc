"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components";

export function ProgressBar() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="grid gap-y-8">
        <div>
          <Progress value={progress} className="w-full" />
          <p className="text-center font-medium text-lg">{progress}% Complete</p>
        </div>
        <div className="flex justify-between items-center">
          <h2>
            R3.5B <br /> Total Value
          </h2>
          <h2>
            R2.2B <br /> Spent to date
          </h2>
          <h2>
            2025-06-21 <br /> Est. Completion Date
          </h2>
        </div>
        {/* <Button className="bg-blue-700 text-white grid w-fit">
          Download Project Brief
        </Button> */}
      </div>
    </>
  );
}

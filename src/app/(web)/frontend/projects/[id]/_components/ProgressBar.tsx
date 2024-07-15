"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components"
import { useRouter } from "next/navigation"

export function ProgressBar() {
  const [progress, setProgress] = React.useState(13)
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
    <div className="grid gap-y-8">

    <div>
    <Progress value={progress} className="w-[60%]"  />
    <span>{progress}% Complete</span>
    </div>
    <div className="flex gap-x-4">

    <Button className="bg-blue-700 text-white grid w-fit hover:bg-blue-400">Download Project Brief</Button>
    <Button className="bg-blue-700 text-white grid w-fit hover:bg-blue-400" onClick={() => router.push("/frontend/apply")}>Apply</Button>
    </div>

    </div>
        
    </>
  )
}

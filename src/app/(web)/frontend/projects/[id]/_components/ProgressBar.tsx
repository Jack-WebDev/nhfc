"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components"

export function ProgressBar() {
  const [progress, setProgress] = React.useState(13)

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
    <Button className="bg-blue-700 text-white grid w-fit">Download Project Brief</Button>
    </div>
        
    </>
  )
}

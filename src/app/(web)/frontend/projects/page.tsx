import { Button, Input, Label } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Projects() {
  return (
    <div>

      <div>
        
      </div>

      <div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fleurhof Integrated Housing Development</CardTitle>
          <CardDescription>
            A mixed-use development providing over 10,000 housing units in
            Johannesburg.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Location: Johannesburg, Gauteng</li>
            <li>Units: 10,000+</li>

            <div>
              <h2>Project Values: R3.5 Billion</h2>
            </div>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="default" className="bg-blue-500 text-white ">View Details</Button>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}

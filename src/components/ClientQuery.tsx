"use client";

import { clientResponseToQuery } from "@/actions/clientRespondToQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export function ClientRespondToQuery({ query }: any) {
  const [reply, setReply] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      replyTo: reply,
      id: query.id,
    };
    try {
      // console.log(formData);
      await clientResponseToQuery(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Ellipsis size={30} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Query Details</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-evenly items-center">
            <div className="grid ">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <p>{query?.fullName}</p>
            </div>
            <div className="grid">
              <Label htmlFor="username" className="text-right">
                Query Type
              </Label>
              <p>{query?.queryType}</p>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="grid ">
              <Label htmlFor="name" className="text-right">
                Loan Applied For
              </Label>
              <p>{query?.loanAppliedFor}</p>
            </div>
            <div className="grid">
              <Label htmlFor="username" className="text-right">
                Query Status
              </Label>
              <p>{query?.queryStatus}</p>
            </div>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <p>{query?.describeQuery}</p>
        </div>

        <div>
            <Label>Admin Reply to your query</Label>
            <p>{query?.adminReply}</p>
        </div>

        <div>
          <Label>Reply To Admin</Label>
          <Input
            placeholder="Respond to the query"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
        {query.queryStatus === "Closed" ? (
          <>
            <DialogFooter className="flex justify-between items-center px-4 w-full">

              <Button disabled={true} onClick={handleSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogFooter className="flex justify-between items-center px-4 w-full">

              <Button onClick={handleSubmit}>Submit</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

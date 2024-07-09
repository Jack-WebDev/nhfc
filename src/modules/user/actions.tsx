import { Button, Dialog, DialogContent, DialogTrigger } from "@/components";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import { CreateForm } from "./createForm";
import { UserType } from "@/schema";
import { UpdateForm } from "./updateForm";

export function UserActions(props: UserActionsProps) {
  const { action, user } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === "create" ? (
          <Button variant="main" className="flex items-center text-white">
            <Plus size={20} className="text-white mr-2" />
            <span className="text-white font-medium font-md">New user</span>
          </Button>
        ) : (
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <Pencil size={10} className="h-6 w-4 text-gray-500" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-full min-w-max  ">
        <span className="text-center font-bold text-lg mb-2 pb-2 border-b border-gray-50">
          {action === "create" ? (
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-semibold text-2xl">New user application</h1>
              <p className="text-sm font-normal text-gray-500">
                To add a new user to the system, please complete the form below
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-semibold text-2xl">User update</h1>
              <p className="text-sm font-normal text-gray-500">
                To update user information to the system, please complete the
                form below
              </p>
            </div>
          )}
        </span>

        {
          //@ts-ignore
          action === "create" ? <CreateForm /> : <UpdateForm user={user} />
        }
      </DialogContent>
    </Dialog>
  );
}

type UserActionsProps = {
  action: string;
  user?: UserType;
};

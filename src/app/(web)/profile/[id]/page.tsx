import { fetchSingleUser } from "@/apiCalls";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  PageHeader,
} from "@/components";
import { UserActions } from "@/modules";
import {
  Calendar,
  Contact,
  Fingerprint,
  Mail,
  MapPin,
  PersonStanding,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import { z } from "zod";

const schema = z.string().cuid();
const isCUID = (id: string) => schema.safeParse(id).success;

async function Page(props: UserPageProps) {
  const { params } = props;

  if (!isCUID(params.id)) {
    return null;
  }

  const { user, error } = await fetchSingleUser(params.id);
  const avatarFallback: string = ((user?.firstName.slice(0, 1) as string) +
    user?.lastName.slice(0, 1)) as string;

  console.log(error);

  const accountDetails = [
    {
      id: 93,
      label: "Email",
      value: () => (
        <p className="font-medium text-xs">{user?.email.toLowerCase()}</p>
      ),
    },

    {
      id: 59,
      label: "Role",
      value: () => (
        <Badge
          variant={
            user?.role === "Admin"
              ? "green"
              : user?.role === "Client"
              ? "orange"
              : user?.role === "Camera_Uploader"
              ? "orange"
              : "gray"
          }
          className="text-xs text-white"
        >
          {user?.role.split("_").join(" ")}
        </Badge>
      ),
    },
    {
      id: 7,
      label: "Status",
      value: () => (
        <Badge
          variant={user?.status === "Active" ? "green" : "red"}
          className="text-xs text-white"
        >
          {user?.status.toLowerCase()}
        </Badge>
      ),
    },
  ];

  const personalDetails = [
    {
      id: 49,
      label: () => (
        <div className="flex items-center gap-2">
          <Contact size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400">Name:</p>
        </div>
      ),
      value: user?.firstName + " " + user?.lastName,
    },
    {
      id: 66,
      label: () => (
        <div className="flex items-center gap-2">
          <Fingerprint size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400 ">Id Number:</p>
        </div>
      ),
      value: user?.IdNumber,
    },

    {
      id: 31,
      label: () => (
        <div className="flex items-center gap-2">
          <PersonStanding size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400 ">Gender:</p>
        </div>
      ),
      value: user?.gender,
    },
    {
      id: 9,
      label: () => (
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400 ">Ethnicity:</p>
        </div>
      ),
      value: user?.ethnicity,
    },
  ];

  const contactDetails = [
    {
      id: 44,
      label: () => (
        <div className="flex items-center gap-2">
          <Mail size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400">Email:</p>
        </div>
      ),
      value: user?.email,
    },
    {
      id: 15,
      label: () => (
        <div className="flex items-center gap-2">
          <Phone size={15} className="text-blue-500" />
          <p className="text-sm text-gray-400">Phone:</p>
        </div>
      ),
      value: user?.phone,
    },
  ];

  return error ? (
    <div>Error fetching user details</div>
  ) : (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex items-center justify-between ">
        <PageHeader
          Icon={User}
          title={`${user?.firstName} ${user?.lastName} `}
        />
      </div>

      <div className="w-full shadow-lg border flex flex-col bg-white rounded-lg p-6 gap-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">User details</p>

          <div className="flex items-center gap-3">
            {user && <UserActions action="update" user={user && user} />}
            {/* {user && <UserDropDown user={user} />} */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Avatar className="w-32 h-32">
            <AvatarImage src="" className="object-cover" />
            <AvatarFallback className="font-bold text-2xl">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 gap-6">
            <div className="flex items-start flex-col border-b pb-4">
              <p className="text-md font-semibold text-blue-500 border-b border-gray-50 w-full pb-1">
                Account details:
              </p>
              <div className="flex flex-col lg:flex-row  items-start lg:items-center gap-2 lg:gap-10 justify-between w-full">
                {accountDetails.map((item) => (
                  <div className="flex flex-col min-w-max gap-2" key={item.id}>
                    <p className="text-sm text-gray-400">{item.label}:</p>
                    <item.value />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-20">
              <div className="flex items-start flex-col ">
                <p className="text-md font-semibold text-blue-500 border-b border-gray-50 w-full pb-1">
                  Personal details:
                </p>
                <div className="flex flex-col items-start gap-2  w-full">
                  {personalDetails.map((item) => (
                    <div
                      className="flex items-center min-w-max gap-2"
                      key={item.id}
                    >
                      <item.label />
                      <p className="text-xs text-gray-600 font-semibold">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start flex-col ">
                <p className="text-md font-semibold text-blue-500 border-b border-gray-50 w-full pb-1">
                  Contact details:
                </p>
                <div className="flex flex-col items-start gap-2  w-full">
                  {contactDetails.map((item) => (
                    <div
                      className="flex items-center min-w-max gap-2"
                      key={item.id}
                    >
                      <item.label />
                      <p className="text-xs text-gray-600 font-semibold">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type UserPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export default Page;

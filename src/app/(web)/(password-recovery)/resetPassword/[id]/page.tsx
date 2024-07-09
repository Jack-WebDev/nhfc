import { fetchSingleUser } from "@/apiCalls";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Form,
  FormInput,
  Loader,
  PageHeader,
  ResponseMessage,
} from "@/components";
import url from "@/lib/apiUrl";
import { ResertPasswordForm, UserActions } from "@/modules";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.string().cuid();
const isCUID = (id: string) => schema.safeParse(id).success;

async function Page(props: UserPageProps) {
  const { params } = props;

  if (!isCUID(params.id)) {
    return null;
  }

  const { user, error } = await fetchSingleUser(params.id);

  return error ? (
    <div>Error fetching user details</div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">

        <div className="p-4 md:rounded-md md:shadow-md md:border border-gray-100 flex flex-col gap-4 items-cemter min-w-max w-[400px]">
            <h1 className="text-lg font-semibold text-center">Reset Password</h1>
            <ResertPasswordForm userId={params.id}/>
        </div>

    </div>
  );
}

export type UserPageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export default Page;



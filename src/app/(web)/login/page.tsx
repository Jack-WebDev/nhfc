"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components";
import { UserContextType, useUserContext } from "@/context";
import { ForgotPassword, LoginForm } from "@/modules";
import Image from "next/image";
import { Img, LogoImg } from "@/assets";
import { Plus } from "lucide-react";

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tracker, setTracker] = useState(0);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BASE_URL as string;
  const { data } = useUserContext() as UserContextType;

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [() => handleSubmit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/auth/login`, { email, password });

      setTracker((prev) => prev + 1);
      location.reload();
    } catch (error) {}
  };
  return (
    <div className="w-full h-screen overflow-auto flex flex-col lg:flex-row items-center  bg-[#f5f5f5] p-4 md:px-16 lg:px-2">
      <div className=" flex flex-col gap-8 flex-1 w-full lg-w-auto py-10 h-fit justify-center bg-[#f5f5f5] items-center px-0 lg:px-24 ">
        <div className="flex flex-col gap-2 items-center">
          <Image
            width={200}
            height={200}
            alt="logo image"
            src={LogoImg}
            className="mb-2 rounded-lg w-20 h-20"
          />
          <h1 className="text-2xl font-semibold text-black">Sign In</h1>
          <p className="text-sm text-center md:text-left text-gray-500 font-normal">
            Sign in to your account to start using Traffic Book system
          </p>
        </div>

        <LoginForm />
        <div className="w-fit self-end h-fit">
          <ForgotPassword />
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full lg-w-auto gap-2 bg-white items-center p-4  h-64 lg:h-full  justify-center rounded-lg">
        <h1 className="w-full flex items-end justify-center text-md md:text-lg lg:text-2xl font-semibold text-blue-500 text-center">
          LDMS  <p className="text-green-600 text-sm pb-1">Plus</p>
        </h1>
        <Image
          width={1920}
          height={1080}
          src={Img}
          alt="Login Illustrator"
          className="w-64 h-40 lg:w-96 lg:h-96  object-contain"
        />
      </div>
    </div>
  );
};

export default LoginPage;

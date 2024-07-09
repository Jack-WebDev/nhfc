"use client";
import Image from "next/image";
import React from "react";
import { LogoImg } from "@/assets";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center py-2 px-2 md:px-2  sticky top-0 bg-white w-full ">
      <div className="h-14 flex items-center justify-center w-full">
        <Link href="/dashboard">
          <Image
            width={500}
            height={500}
            alt="logi Image"
            src={"/s-logo.png"}
            className="w-16 h-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;

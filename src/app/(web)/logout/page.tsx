"use client";

import { Loader } from "@/components";
import axios from "axios";

import { useEffect } from "react";

export default function RootLayout() {
  const url = process.env.BASE_URL as string;
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.post(`/api/auth/logout`);
        window.location.replace("/");
      } catch (error) {}
    };

    logout();
  }, [url]);

  return (
    <div className="h-screen w-screen fixed bg-white top-0 left-0 grid place-items-center">
      <Loader />
    </div>
  );
}

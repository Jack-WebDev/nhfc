"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { getAuthCookie } from "./serverActions";
import { decodeJwt } from "@/utils";
import { useRouter } from "next/navigation";

export type SessionPayLoad = {
  userId: string;
  lastPasswordChanged: Date;
  expiresAt: Date;
  role: string;
  status: string;
  token: string;
  iat: number;
  ext: number;
};

export type UserContextType = {
  data: SessionPayLoad | undefined;
};

const StateContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<SessionPayLoad>();
  const router = useRouter();

  useEffect(() => {
    const token = async () => {
      const token = (await getAuthCookie()) as string;
      const decoded = token
        ? token.toString().length > 0 && decodeJwt(token)
        : null;

      setData(decoded as SessionPayLoad);
    };

    token();
  }, []);

  useEffect(() => {
    if (data?.role === "Admin") {
      router.push("/dashboard");
    } else if (data?.role === "Data_Capture") {
      router.push("/frontend");
    }
  }, [data,router]);

  return (
    <StateContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useUserContext = () => useContext(StateContext);

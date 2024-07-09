"use client";
import { Loader } from "@/components";
import url from "@/lib/apiUrl";
import { UserType } from "@/schema";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function User(props: UserProps) {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId, type } = props;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/users/${userId}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  if(type){
    const name = user?.firstName + ' ' + user?.lastName;
    return name
  }

  return loading ? (
    <Loader
      size="xs"
      className="min-w-0 max-w-[20px] max-h-[20px] border-blue-500"
    />
  ) : (
    user && (
      <p className="text-sm text-blue-500 font-semibold">
        {user?.firstName + " " + user?.lastName}
      </p>
    )
  );
}

type UserProps = {
  userId: string;
  type?: string;
};

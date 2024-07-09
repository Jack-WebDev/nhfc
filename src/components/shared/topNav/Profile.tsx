"use client"
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Mail, ClipboardList, User, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  LinkIconButton,
  DropdownMenuSeparator,
  Loader
} from "@/components";
import axios from "axios";
import url from "@/lib/apiUrl";


export const Profile = () => {
  const [userProfile, setUserProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetcher = async() => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/me`);
        setUserProfile(res.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetcher();
  }, [])

  const avatarFallBack = userProfile && userProfile?.firstName.slice(0,1) !  + userProfile?.lastName.slice(0,1)!;

  return (
    loading? <Loader size="xs" className="min-w-0 w-10 h-10 border-blue-500"/> :
    userProfile &&
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 hover:bg-transparent"
        >
          <Avatar>
            <AvatarImage
              src={userProfile?.image ? userProfile?.image: ""}
              className="object-cover"
            />
            <AvatarFallback>{avatarFallBack || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-xs">{userProfile?.firstName + " " + userProfile?.lastName}</p>
            <p className="flex items-center gap-2 capitalize font-bold text-xs text-blue-500">
              {(userProfile?.role)?.toLowerCase()} <ChevronDown size={18} className="font-bold" />
            </p>
          </div>
        </Button>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        
        <DropdownMenuItem className="w-full">
            <LinkIconButton title="Profile" link={true} url={`/profile/${userProfile.id}`} Icon={User}/>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200 text-gray-200" />
        <DropdownMenuItem className="w-full">
          <LinkIconButton title="Logout" link={true} url="/logout" Icon={LogOut}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




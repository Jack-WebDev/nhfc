// src/app/(web)/frontend/_components/TopNav.tsx

"use client";

import React, { useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { Bell, AlignLeft, MessageCircle } from "lucide-react";
import { Profile } from "./Profile";
import { UiContextType, useUiStateContext } from "@/context";

import { useNotificationContext } from "@/app/(web)/frontend/_components/NotificationContext";
import NotificationList from "@/app/(web)/frontend/_components/NotificationList";


export function TopNav() {
  const { menu, toggleMenu } = useUiStateContext() as UiContextType;
  const { notifications } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex items-center justify-between py-4 px-2 md:px-6 shadow-sm border-b sticky top-0 bg-white w-full">
      <AlignLeft className="text-gray-500 cursor-pointer" onClick={toggleMenu} />
      <div className="relative flex items-center gap-2">
        <MessageCircle />
        <div className="relative">
          <Bell
            className={`text-gray-500 cursor-pointer ${notifications.length > 0 ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleNotificationClick}
          />
          {showNotifications && <NotificationList />}
        </div>
        <Profile />
      </div>
    </div>
  );
}

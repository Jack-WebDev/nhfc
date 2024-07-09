"use server";

import db from "@/utils/connect";
import { UserRole } from "@prisma/client";
import axios from "axios";

export async function fetchUsers() {
  try {
    const users = await db.user.findMany();

    return {
      users: users,
      error: null,
    };
  } catch (error) {

    return {
        users: null,
        error: error,
      };
  }
}
export async function fetchUsersByRole(role: string) {

  let userRole = ""
  switch(role){
    case "Traffic_Officer":
      userRole = UserRole.Traffic_Officer;
      break;
    case "Camera_Uploader":
      userRole = UserRole.Camera_Uploader;
      break;
    case "Data_Capture":
      userRole = UserRole.Data_Capture;
      break;
    case "Admin":
      userRole = UserRole.Admin;
      break;
  }
  try {
    const users = await db.user.findMany({
      where: {
        role: userRole as UserRole,
      }
    });


    return {
      users: users,
      error: null,
    };
  } catch (error) {

    return {
        users: null,
        error: error,
      };
  }
}
export async function fetchSingleUser(userId: string) {
  try {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    return {
      user: user,
      error: null,
    };
  } catch (error) {

    return {
        user: null,
        error: error,
      };
  }
}

export async function fetchUserProfile(userId: string){
  try {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    return {
      user: user,
      error: null,
    };
  } catch (error) {

    return {
        user: null,
        error: error,
      };
  }
}



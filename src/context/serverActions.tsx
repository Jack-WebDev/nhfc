"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { SessionPayLoad } from ".";

export async function getAuthCookie() {
  const cookie = cookies().get("authToken");
  if (!cookie) {
    return null;
  }

  const token = cookie.value;
  if (!token) {
    return null;
  }

  return token;
}

export async function getAuth() {
  const authCookie = (await getAuthCookie()) as string;
  const data = authCookie ? jwtDecode(authCookie) : null;

  return data as SessionPayLoad | null;
}

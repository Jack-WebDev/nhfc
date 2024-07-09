import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UserContextType, getAuth, getAuthCookie } from "./context";
import { JwtPayload } from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const data = await getAuth();
  const token = await getAuthCookie();
  //@ts-ignore
  //@ts-ignore
  const expiry = new Date(data?.expiresAt)
  const now = new Date(Date.now());
  //@ts-ignore
  const timeDifference = expiry - now;

  const userId = data?.userId


  if (request.nextUrl.pathname.startsWith("/api/users")) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: " Unauthenticated User" }),
        { status: 403 }
      );
    }

    if (request.method === "POST") {
      //@ts-ignore
      if (data?.role !== "Admin") {
        return new NextResponse(JSON.stringify({ message: "You are not authorized to create new user" }), {
          status: 401,
        });
      }
    }
    if (request.method === "PATCH") {
      //@ts-ignore
      if (data?.role !== "Admin") {
        return new NextResponse(JSON.stringify({ message: "You are not authorized to modify user accounts" }), {
          status: 401,
        });
      }
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/batch") || request.nextUrl.pathname.startsWith("/api/books")) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: " Unauthenticated User" }),
        { status: 403 }
      );
    }
    if (request.method === "POST" || request.method === "PATCH") {
        //@ts-ignore
        if (data?.role !== "Admin" && data?.role !== "Data_Capture") {
          return new NextResponse(JSON.stringify({ message: "You are not authorized for this actions" }), {
            status: 401,
          });
        }
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?message=unauthenticated`, request.url)
      );
    }

    

    if(timeDifference < 0){
      return NextResponse.redirect(
        new URL(`/logout`, request.url)
      );
    }
    
    
  }


  // if (request.nextUrl.pathname.startsWith("/login")) {
  //   if (token) {

  //         if(timeDifference < 0){
  //           return NextResponse.redirect(
  //             new URL(`/updatePassword/${userId}`, request.url)
  //           );
  //         }
     
  //         return NextResponse.redirect(
  //           new URL(`/dashboard`, request.url)
  //         );
        
  //     }
    
  // }

  if (request.nextUrl.pathname.startsWith("/dashboard/users")) {
    //@ts-ignore
    if(data?.role !== "Admin"){
      return NextResponse.redirect(
        new URL(`/dashboard/capturing`, request.url)
      );
    
    }
      
    
    
  }
  if (request.nextUrl.pathname.startsWith("/dashboard/reports")) {
    //@ts-ignore
    if(data?.role !== "Admin"){
      return NextResponse.redirect(
        new URL(`/dashboard/capturing`, request.url)
      );
    
    }
      
    
    
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/dashboard/capturing`, request.url));
  }
  
  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

}


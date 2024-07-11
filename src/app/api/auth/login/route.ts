import { NextResponse } from "next/server";
import db from "@/utils/connect";
import bcrypt from "bcrypt";
//@ts-ignore
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserStatus } from "@prisma/client";

export const POST = async (request: Request) => {
  const accessSecret = process.env.ACCESS_TOKEN as string;
  const authSecret = process.env.AUTH_TOKEN as string;

  // grab data from the request
  const data = await request.json();
  const { password, email } = data;

  const user = await db.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Email not found" }), {
      status: 404,
    });
  }

  // Check user status
  if (user.status !== UserStatus.Active) {
    return new NextResponse(JSON.stringify({ message: "User Account not active" }), {
      status: 404,
    });
  }


  // decrypt password
  const compare = bcrypt.compareSync(password, user.password);

  if (!compare) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 404 }
    );
  }

  // create session token
  const sessionToken = jwt.sign(
    {
      
      id: user.id,
      role: user.role,
      status: user.status,
      
    },
    accessSecret,
    { expiresIn: 60 * 60 * 24 }
  );


  //Create auth token
  const authToken = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      token: sessionToken,
      status: user.status,
    },
    authSecret,
    { expiresIn: "1d" }
  );

  try {
    // find session or create a new one
    try {
        const session = await db.session.upsert({
            where: {
              userId: user.id,
            },
            update: {
              sessionToken: sessionToken,
            },
            create: {
              userId: user.id,
              sessionToken: sessionToken,
            },
          });
    } catch (error) {
        return new NextResponse(JSON.stringify({error,  message: "Failed to create session" }), {
            status: 500,
          });
    }


    // store user session for 7 days
    cookies().set("authToken", authToken, {
      maxAge: 86400,
    });
    cookies().set("userToken", user.id, {
      maxAge: 86400,
    });

    return new NextResponse(JSON.stringify({ message: "login Successful" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({error, message: "Failed to login" }), {
      status: 500,
    });
  }
};

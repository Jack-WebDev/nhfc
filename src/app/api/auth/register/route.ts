import { NextResponse } from "next/server";
import db from "@/utils/connect";
import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
import { transporter } from "@/notifications";

export const POST = async (request: Request) => {

  // grab data from the request
  const data = await request.json();
  const {
    password,
    email,
    phone,
    idNumber,
    firstName,
    lastName,
    title,
    ethnicity,
    gender,
    role,
  } = data;

  console.log(phone)

  const emailExist = await db.user.findUnique({
    where: { email: email },
  });


  console.log(emailExist)
  if (emailExist) {
    return new NextResponse(
      JSON.stringify({ message: "Email already registered" }),
      { status: 409 }
    );
  }

  console.log("here3")
  const phoneExist = await db.user.findUnique({
    where: { phone: phone },
  });

  console.log("333")

  if (phoneExist) {
    return new NextResponse(
      JSON.stringify({ message: "Phone number already registered" }),
      { status: 409 }
    );
  }

  console.log("44")
  const IdNumberExist = await db.user.findUnique({
    where: { IdNumber: idNumber },
  });

  console.log("dsds")
  if (IdNumberExist) {
    return new NextResponse(
      JSON.stringify({ message: "ID Number already registered" }),
      { status: 409 }
    );
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  console.log("2")

  try {
    let role = "Data_Capture"
    console.log(email, phone, idNumber, firstName, lastName, title, ethnicity, gender, role, hashedPassword)
    const user = await db.user.create({
      data: {
        email: email,
        phone: phone,
        IdNumber: idNumber,
        firstName: firstName,
        lastName: lastName,
        title: title,
        ethnicity: ethnicity,
        gender: gender,
        role: "Data_Capture",
        password: hashedPassword,
        status: UserStatus.Active,
      },
    });

    console.log(user)

    // const otp = Math.floor(100000 + Math.random() * 900000);

    // try {
    //   await db.otp.create({
    //     data: {
    //       userId: user?.id,
    //       otp: otp,
    //       date: new Date(Date.now() + 15 * 60 * 1000),
    //     },
    //   });

    //   try {
    //     await transporter.sendMail({
    //       from: email,
    //       to: user.email,
    //       subject: "NHFC",
    //       text: `Your OPT is: ${otp}`,
    //     });
    //   } catch (error) {
    //     await db.otp.delete({
    //       where: {
    //         userId: user.id,
    //       },
    //     });
    //     console.log(error);
    //     return new NextResponse(
    //       JSON.stringify({
    //         error,
    //         message: "Failed to send OTP, try again later",
    //       }),
    //       { status: 403 }
    //     );
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   return new NextResponse(
    //     JSON.stringify({ error, message: "Failed to create OTP" }),
    //     { status: 500 }
    //   );
    // }

    return new NextResponse(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to create user" }),
      { status: 500 }
    );
  }
};
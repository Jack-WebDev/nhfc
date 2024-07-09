import { NextResponse } from "next/server";
import db from "@/utils/connect";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { randomGenerator } from "@/lib/methods";
import { cookies } from "next/headers";
import { SessionPayLoad, getAuth } from "@/context";
import { batchSchema, userSchema } from "@/schema";
import { IdNumberExists, emailExists, phoneExists } from "@/validation";
import { getLastBookNumber } from "@/apiCalls/book";
import { createBatch } from "@/modules";
import { UserActivity, UserActivityAction } from "@prisma/client";
import { decodeJwt } from "@/utils";



export const POST = async (request: Request) => {
  const auth = await getAuth();
  //@ts-ignore


  if (!auth) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthenticated User" }),
      { status: 406 }
    );
  }


  // grab data from the request
  const userId = cookies().get("userToken")?.value as string;
  const data = await request.json();


  const validate = batchSchema.safeParse(data);
  if (!validate.success) {
    return new NextResponse(
      JSON.stringify({ message: "Data validation Error!" }),
      { status: 406 }
    );
  }

  // Add new batch
  try {
    const newBatch = await db.batch.create({
      data: {
        batchType: data.batchType,
        firstNotice: data.firstNotice,
        lastNotice: data.lastNotice,
        capturedBy: userId,
      },
    });

    if (!newBatch) {
      return new NextResponse(
        JSON.stringify({ message: "batch creation error" }),
        { status: 500 }
      );
    }

    // get the first book number of the batch
    const { bookNumber, error } = await getLastBookNumber();
    if (error || bookNumber === null) {
      return new NextResponse(
        JSON.stringify({ message: "failed to check books" }),
        { status: 404 }
      );
    }

    const firstBookNumber = bookNumber + 1;

    const batchInfo = {
      firstNotice: newBatch.firstNotice,
      batchId: newBatch.batchId,
      batchType: newBatch.batchType,
      pagesPerBook: data.pagesPerBook,
      firstBookNumber: firstBookNumber,
      numberOfBooks: data.numberOfBooks,
    };
    const { books, pages } = createBatch(batchInfo);

    // create books for the batch

    try {
      const newBooks = await db.book.createMany({
        data: [...books],
      });

      try {
        const newPages = await db.notice.createMany({
          data: [...pages],
        });

        try {
          await db.report.create({
              data: {
                  adminId: userId,
                  activity: UserActivity.Batch_Management,
                  batchId: newBatch.batchId,
                  activityAction: UserActivityAction.Create, 
                  message: `New batch with batch number ${newBatch.batchId} has been created under 
                    ${newBatch.batchType === 10? "Hand written": newBatch.batchType === 50? "Section 56" : "Section 56 By-Law"}
                  `
              }
          })
      } catch (error: any) {
          await db.batch.delete({
            where: {
              batchId: newBatch.batchId,
            }
          })
          return new NextResponse(
            JSON.stringify({ message: error.response.data }),
            { status: 201 }
          );
      }

        return new NextResponse(
          JSON.stringify({ message: "Batch created successfully" }),
          { status: 201 }
        );
      } catch (error) {
        // delete newly created batch and its books
        await db.batch.delete({
          where: {
            batchId: newBatch.batchId,
          },
        });
        return new NextResponse(
          JSON.stringify({ message: "failed to create pages" }),
          { status: 500 }
        );
      }
    } catch (error) {
      // delete the newly created batch
      await db.batch.delete({
        where: {
          batchId: newBatch.batchId,
        },
      });
      return new NextResponse(
        JSON.stringify({ message: "failed to create books" }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "failed to create batch" }),
      { status: 500 }
    );
  }
};

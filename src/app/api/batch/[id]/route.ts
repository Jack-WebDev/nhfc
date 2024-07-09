import { NextResponse } from "next/server";
import db from "@/utils/connect";
import { getAuth } from "@/context";
import { userUpdateSchema } from "@/schema";
import { UserActivity, UserActivityAction } from "@prisma/client";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const auth = await getAuth();
  //@ts-ignore
  const authId = auth?.userId as string;

  const user = await db.user.findUnique({
    where: { id: authId },
  })

  if(!user) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthenticated User" }),
      { status: 406 }
    );
  }

  // grab data from the request
  const batchId = Number(params.id);

  //Check if the batch exists
  const batch = await db.batch.findUnique({
    where: {
      batchId: batchId,
    },
  });

  if (!batch) {
    return new NextResponse(JSON.stringify({ message: "Batch not found" }), {
      status: 404,
    });
  }

  try {
    await db.batch.delete({
      where: {
        batchId: batchId,
      },
    });
    try {
      await db.report.create({
          data: {
              adminId: authId,
              batchId: batchId,
              activity: UserActivity.Batch_Management,
              activityAction: UserActivityAction.Delete, 
              message: `The batch with batch number ${batchId} has been deleted by 
                ${user.firstName} ${user.lastName}
              `
          }
      })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Batch deleted successfully. But failed to create activity report" }),
      { status: 200 }
    );
  }
    return new NextResponse(
      JSON.stringify({ message: "Batch deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error, message: "Failed to delete batch" }),
      { status: 500 }
    );
  }
};

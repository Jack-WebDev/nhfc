"use server";

import db from "@/utils/connect";

export async function adminResponseToQuery(data: any) {
  try {
    await db.queries.update({
      where: {
        id: data.id,
      },
      data: {
        adminReply: data.replyTo,
        adminAttachment: "Admin Attachments",
      },
    });
  } catch (error) {
    console.error("Error creating query:", error);
    return null;
  }
}

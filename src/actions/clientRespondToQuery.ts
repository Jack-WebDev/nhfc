"use server";

import db from "@/utils/connect";

export async function clientResponseToQuery(data: any) {
  try {
    await db.queries.update({
      where: {
        id: data.id,
      },
      data: {
        clientReply: data.replyTo,
        clientAttachment: "Client Attachments",
      },
    });
  } catch (error) {
    console.error("Error creating query:", error);
    return null;
  }
}

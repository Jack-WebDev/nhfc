"use server";

import db from "@/utils/connect";

export async function createQuery(data: any) {
  function generateUniqueId(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
  try {
    await db.queries.create({
      data: {
        referenceNo: generateUniqueId(),
        fullName: data.fullName,
        queryType: data.queryType,
        describeQuery: data.describeQuery,
        loanAppliedFor: data.appliedLoan,
        clientAttachment: data.attachments,
      },
    });
    return true;
  } catch (error) {
    console.error("Error creating query:", error);
    return null;
  }
}

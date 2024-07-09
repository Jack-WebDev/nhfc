import db from "@/utils/connect";

export async function emailExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  return true
}
export async function phoneExists(phone: string) {
  const user = await db.user.findUnique({
    where: {
      phone: phone,
    },
  });

  if (!user) {
    return false;
  }

  return true
}
export async function IdNumberExists(val: string) {
  const user = await db.user.findUnique({
    where: {
      IdNumber: val,
    },
  });

  if (!user) {
    return false;
  }

  return true
}

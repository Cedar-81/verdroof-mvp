"use server";

import { cookies } from "next/headers";

export async function create_cookie(data: { token: any; user: any }) {
  const token = data.token;
  const user = data.user;

  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  cookies().set("token", token, {
    expires: new Date(Date.now() + thirtyDaysInMilliseconds),
  });
  cookies().set("user", JSON.stringify(user), {
    expires: new Date(Date.now() + thirtyDaysInMilliseconds),
  });
}

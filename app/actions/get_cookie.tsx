"use server";

import { cookies } from "next/headers";

export async function get_cookie() {
  return cookies().get("token")?.value;
}

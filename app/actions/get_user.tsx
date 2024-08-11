"use server";

import { cookies } from "next/headers";

export async function get_user() {
  return cookies().get("user")?.value;
}

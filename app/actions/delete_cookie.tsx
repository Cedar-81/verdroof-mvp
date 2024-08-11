"use server";

import { cookies } from "next/headers";

export async function del_cookie() {
  cookies().delete("token");
  cookies().delete("user");
}

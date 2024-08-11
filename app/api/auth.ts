import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  await fetch("https://admin.verdroof.com/api/auth/create");
}

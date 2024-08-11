"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Host() {
  const router = useRouter();
  useEffect(() => router.push("/hosting/listing"), []);
}

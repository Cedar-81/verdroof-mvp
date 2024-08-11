"use client";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerify } from "../utils/hooks/useVerify";
import { useEffect } from "react";

export default function Verify() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const router = useRouter();
  const { mutate: verify, error } = useVerify();

  useEffect(() => {
    if (!token && !code) {
      router.push("/buy/listing");
    } else if (token && code) {
      verify({ code, token });
    }
  }, []);

  return (
    <div className="h-[100vh] bg-black text-white w-[100vw] fixed flex items-center justify-center">
      <div className="space-y-4">
        <LoaderCircle className="animate-spin h-56 w-56 flex flex-col justify-center" />
        <h1 className="text-2xl text-center">Verifying...</h1>
      </div>
    </div>
  );
}

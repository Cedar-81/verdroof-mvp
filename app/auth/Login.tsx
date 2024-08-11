"use client";
import { X } from "lucide-react";
import { useGeneralContext } from "../utils/contexts/GeneralContext";
import { LoginFormErrors } from "../utils/interfaces";
import LoginForm from "./LoginForm";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const { setShowLogin } = useGeneralContext();

  return (
    <div className="fixed top-0 right-0 h-[100vh] w-[100vw] flex bg-black/50 overflow-y-auto py-8 px-2 md:px-0">
      <div className="w-[40rem] h-max pb-10 mx-auto my-auto bg-white rounded-lg shadow-lg ">
        <div className="py-4 px-6 flex justify-between items-center">
          <X
            onClick={() => setShowLogin(false)}
            className="h-5 w-5 cursor-pointer"
          />
          <h1 className="font-medium ">Login</h1>
          <div></div>
        </div>
        <hr />

        <div className="space-y-8 px-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium pt-8">Welcome back,</h2>
              <p className="text-xs">
                Sign in to your VERDROOF account and continue your journey
                towards a sustainable future.
              </p>
            </div>
            <LoginForm />
          </div>

          <div className="flex text-black/70 font-medium text-sm justify-between items-center gap-x-4">
            <div className="border-t border-black/30 w-full" /> or{" "}
            <div className="border-t border-black/30 w-full" />
          </div>

          <button
            onClick={() => toast.info("Service currently unavailable")}
            className="w-full p-2 font-medium flex items-center hover:bg-gray-100 justify-between rounded-lg border border-black/70"
          >
            <img
              src="/images/google_icon.png"
              className="h-8 w-8"
              alt="google icon"
            />
            Sign in with Google
            <div></div>
          </button>
        </div>
      </div>
    </div>
  );
}

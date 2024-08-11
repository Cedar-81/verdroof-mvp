import { useMutation } from "@tanstack/react-query";
import { useGeneralContext } from "../contexts/GeneralContext";
import { SignupFormData, SignupFormSchema } from "../interfaces";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Param {
  token: string;
  code: string;
}
const verify = async (verify_data: Param) => {
  const { token, code } = verify_data;

  const response = await fetch(
    `https://admin.verdroof.com/api/auth/verify/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        code,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed");
  }

  return data;
};

export const useVerify = () => {
  const { setShowLogin } = useGeneralContext();
  const router = useRouter();

  return useMutation({
    mutationFn: verify,
    onSuccess: (data) => {
      toast.success("Validation successful");
      setShowLogin(true);
      router.push("/buy/listing?showLogin=true");
    },

    onError: (error) => {
      toast.error(error.message);
      // console.error("Verification failed:", error);
      router.push("/buy/listing");
    },
  });
};

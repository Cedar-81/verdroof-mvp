import { useMutation } from "@tanstack/react-query";
import { useGeneralContext } from "../contexts/GeneralContext";
import { LoginFormData, LoginFormSchema } from "../interfaces";
import { create_cookie } from "@/app/actions/login_action";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const login = async (loginData: LoginFormData) => {
  // Validate the login data
  LoginFormSchema.parse(loginData);

  // Make the API request
  const response = await fetch("https://admin.verdroof.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const useLogin = () => {
  const { setShowLogin, setUserData } = useGeneralContext();
  const searchParams = useSearchParams();
  const showLoginParam = searchParams.get("showLogin");
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Save the returned data to state
      //   setLoginFormData(data);
      toast.success("Login successful");
      setShowLogin(false);
      create_cookie(data.data);
      setUserData({
        email: data && data.data && data.data.user.email,
        firstname: data && data.data && data.data.user.firstname,
        lastname: data && data.data && data.data.user.lastname,
      });
      if (showLoginParam?.trim() == "true") {
        router.push("/buy/listing");
      }
      return data;
    },

    onError: (error) => {
      toast.error(error.message);
      return error;
    },
  });
};

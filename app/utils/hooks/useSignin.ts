import { useMutation } from "@tanstack/react-query";
import { useGeneralContext } from "../contexts/GeneralContext";
import { SignupFormData, SignupFormSchema } from "../interfaces";
import { toast } from "react-toastify";

const signup = async (signupData: SignupFormData) => {
  // Validate the login data
  SignupFormSchema.parse(signupData);
  const { email, password, firstname, lastname } = signupData;
  // Make the API request
  const response = await fetch("https://admin.verdroof.com/api/auth/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
      first_name: firstname,
      last_name: lastname,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const useSignup = () => {
  const { setShowSignup } = useGeneralContext();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // Save the returned data to state
      //   setSignupFormData(data);
      toast.success("Signup success. Check your email for verification link.");
      setShowSignup(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

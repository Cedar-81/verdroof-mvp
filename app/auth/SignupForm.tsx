"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormData, SignupFormSchema } from "../utils/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../utils/hooks/useSignin";
import { useGeneralContext } from "../utils/contexts/GeneralContext";
import Link from "next/link";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
  });

  const { mutate: signup, isPending, error } = useSignup();
  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    signup(data);
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="border rounded-lg border-black/70">
        <div className="grid grid-cols-2 border-b border-b-black/70">
          <div className="flex flex-col border-r border-r-black/70  p-2">
            <label htmlFor="email" className="text-sm">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              {...register("firstname")}
              className="outline-none bg-transparent"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>
          <div className="flex flex-col  p-2">
            <label htmlFor="lastname" className="text-sm">
              Lastname
            </label>
            <input
              id="lastname"
              type="text"
              {...register("lastname")}
              className="outline-none bg-transparent"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col  p-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="outline-none bg-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col border-t border-t-black/70 p-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="outline-none bg-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>
      <p className="text-xs">
        By clicking &quot;Continue&quot; you agree to VERDROOF&apos;s Terms of
        Service and Privacy Policy.{" "}
        <Link href={""}>
          <span className="font-semibold underline text-brand_secondary">
            Privacy Policy
          </span>
        </Link>
      </p>

      <div className="pt-8 pb-2">
        <button type="submit" className="btn w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

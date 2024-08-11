"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData, LoginFormSchema } from "../utils/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../utils/hooks/useLogin";
import { useGeneralContext } from "../utils/contexts/GeneralContext";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { mutate: login, isPending } = useLogin();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data);
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="border rounded-lg border-black/70">
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
        We&apos;re glad to have you back again.{" "}
        {/* <span className="font-medium">Privacy Policy</span> */}
      </p>

      <div className="pt-8 pb-2">
        <button type="submit" className="btn w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Continue"}
        </button>
      </div>
    </form>
  );
}

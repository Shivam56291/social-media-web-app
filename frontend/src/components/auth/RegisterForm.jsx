import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  User,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";

import { authService } from "../../services/authService";

export default function RegisterForm({
  switchToLogin,
}) {
  const [loading, setLoading] =
    useState(false);

  const [apiError, setApiError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError("");
      setSuccessMessage("");

      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setSuccessMessage(
        "Account created successfully."
      );

      reset();

      setTimeout(() => {
        switchToLogin({
          login: data.email,
        });
      }, 1800);
    } catch (error) {
      const backendErrors =
        error?.response?.data;

      if (
        backendErrors &&
        typeof backendErrors === "object"
      ) {
        const firstError =
          Object.values(backendErrors)[0];

        setApiError(
          Array.isArray(firstError)
            ? firstError[0]
            : "Registration failed"
        );
      } else {
        setApiError(
          "Unable to create account"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-white">
          Create account
        </h2>

        <p className="mt-2 text-slate-400">
          Join ConnectSphere and start
          building meaningful connections.
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Username"
          type="text"
          placeholder="Choose username"
          icon={<User size={18} />}
          error={errors.username?.message}
          {...register("username", {
            required:
              "Username is required",
            minLength: {
              value: 3,
              message:
                "Minimum 3 characters",
            },
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:
                "Enter a valid email",
            },
          })}
        />

        <Input
          className="hide-password-toggle"
          label="Password"
          type="password"
          placeholder="Create password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password", {
            required:
              "Password is required",
            minLength: {
              value: 8,
              message:
                "Minimum 8 characters",
            },
          })}
        />

        <Input
          className="hide-password-toggle"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          icon={<Lock size={18} />}
          error={
            errors.confirmPassword?.message
          }
          {...register("confirmPassword", {
            required:
              "Confirm your password",

            validate: (value) =>
              value === password ||
              "Passwords do not match",
          })}
        />

        <label className="flex items-start gap-3 text-sm text-slate-400">
          <input
            type="checkbox"
            className="
              mt-1 h-4 w-4 rounded
              border-slate-600
              bg-slate-800
              text-indigo-500
            "
            {...register("terms", {
              required:
                "You must accept terms",
            })}
          />

          <span>
            I agree to the Terms of Service
            and Privacy Policy
          </span>
        </label>

        {errors.terms && (
          <p className="text-sm text-rose-400">
            {errors.terms.message}
          </p>
        )}

        {apiError && (
          <div
            className="
              rounded-2xl border
              border-rose-500/20
              bg-rose-500/10
              p-4 text-sm
              text-rose-300
            "
          >
            {apiError}
          </div>
        )}

        {successMessage && (
          <div
            className="
              flex items-center gap-3
              rounded-2xl border
              border-emerald-500/20
              bg-emerald-500/10
              p-4 text-sm
              text-emerald-300
            "
          >
            <CheckCircle2 size={18} />

            {successMessage}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          loadingText="Creating account..."
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}
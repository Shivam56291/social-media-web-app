import { useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  Mail,
  Lock,
  Globe,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";

import { authService } from "../../services/authService";

import { authStorage } from "../../services/authStorage";

import {
  loginStart,
  loginSuccess,
} from "../../features/auth/authSlice";

export default function LoginForm({
  defaultLogin = "",
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [apiError, setApiError] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: defaultLogin,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      dispatch(loginStart());

      setApiError("");

      const response =
        await authService.login({
          login: data.login,
          password: data.password,
        });

      authStorage.setAuth(
        response,
        rememberMe
      );

      dispatch(loginSuccess(response));

      navigate("/dashboard");
    } catch (error) {
      console.log(
        error?.response?.data
      );

      setApiError(
        error?.response?.data?.detail ||
          error?.response?.data
            ?.error ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-white">
          Welcome back
        </h2>

        <p className="mt-2 text-slate-400">
          Sign in to continue to
          ConnectSphere.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Username or Email"
          type="text"
          placeholder="Enter username or email"
          icon={<Mail size={18} />}
          error={errors.login?.message}
          {...register("login", {
            required:
              "Username or email is required",
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password", {
            required:
              "Password is required",

            minLength: {
              value: 6,
              message:
                "Password must be at least 6 characters",
            },
          })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
              className="
                h-4 w-4 rounded
                border-slate-600
                bg-slate-800
                text-indigo-500
              "
            />

            Remember me
          </label>

          <button
            type="button"
            className="
              text-sm text-indigo-400
              transition hover:text-indigo-300
            "
          >
            Forgot Password?
          </button>
        </div>

        {apiError && (
          <div
            className="
              rounded-2xl border
              border-red-500/20
              bg-red-500/10
              p-4 text-sm
              text-red-300
            "
          >
            {apiError}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          loadingText="Signing in..."
        >
          Sign In
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>

          <div className="relative flex justify-center">
            <span
              className="
                bg-[#0B1120]
                px-4 text-sm
                text-slate-500
              "
            >
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <button
          type="button"
          className="
            flex w-full items-center
            justify-center gap-3
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            px-5 py-3
            text-slate-300
            transition-all duration-300
            hover:border-white/20
            hover:bg-white/[0.06]
          "
        >
          <Globe size={18} />

          Continue with Google
        </button>
      </form>
    </div>
  );
}
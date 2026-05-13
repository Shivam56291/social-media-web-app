import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm text-slate-300">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            autoComplete="new-password"
            style={{
              WebkitAppearance: "none",
            }}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={`
              w-full rounded-2xl border border-slate-700
              bg-white/5 px-4 py-3
              text-white outline-none
              backdrop-blur-xl
              transition-all duration-300
              focus:border-indigo-400
              focus:ring-2 focus:ring-indigo-500/30
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3.5 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
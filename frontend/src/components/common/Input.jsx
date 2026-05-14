import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  forwardRef,
  useState,
} from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      className = "",
      inputClassName = "",
      showPasswordToggle = true,
      icon,
      ...props
    },
    ref
  ) => {

    const [
      showPassword,
      setShowPassword,
    ] = useState(false);

    const isPassword =
      type === "password";

    return (
      <div className="space-y-2">

        {/* LABEL */}
        {label && (
          <label
            className="
              text-sm
              font-medium
              text-slate-300
            "
          >
            {label}
          </label>
        )}

        {/* INPUT WRAPPER */}
        <div className="relative">

          {/* LEFT ICON */}
          {icon && (
            <div
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-slate-400
              "
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            autoComplete="new-password"
            style={{
              WebkitAppearance:
                "none",
            }}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={`
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-white/5
              py-3
              text-white
              outline-none
              backdrop-blur-xl
              transition-all
              duration-300

              ${
                icon
                  ? "pl-12"
                  : "pl-4"
              }

              ${
                isPassword &&
                showPasswordToggle
                  ? "pr-12"
                  : "pr-4"
              }

              focus:border-indigo-400
              focus:ring-2
              focus:ring-indigo-500/30

              ${className}
              ${inputClassName}
            `}
            {...props}
          />

          {/* PASSWORD TOGGLE */}
          {isPassword &&
            showPasswordToggle && (
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-400
                  transition-all
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            )}
        </div>

        {/* ERROR */}
        {error && (
          <p
            className="
              text-sm
              text-rose-400
            "
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
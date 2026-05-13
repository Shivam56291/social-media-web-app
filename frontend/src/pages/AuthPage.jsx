import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import HeroSection from "../components/landing/HeroSection";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] =
    useState(true);

  const [prefilledLogin, setPrefilledLogin] =
    useState("");

  const handleSwitchToLogin = (data) => {
    setIsLogin(true);

    if (data?.login) {
      setPrefilledLogin(data.login);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#070B14]
        text-white
      "
    >
      <div
        className="
          grid min-h-screen
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            relative flex
            min-h-[320px]
            border-b border-white/5
            lg:min-h-screen
            lg:border-b-0
            lg:border-r
          "
        >
          <HeroSection />
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            relative flex
            items-start
            justify-center
            px-5
            py-8
            sm:px-8
            lg:px-12
            lg:py-10
          "
        >
          {/* BACKGROUND GLOW */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%)]
            "
          />

          {/* CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              relative z-10
              w-full max-w-md
              rounded-[28px]
              border border-white/10
              bg-white/[0.04]
              p-6
              shadow-[0_0_60px_rgba(99,102,241,0.12)]
              backdrop-blur-2xl
              sm:p-8
            "
          >
            {/* TOGGLE */}
            <div className="mb-6">
              <div
                className="
                  relative flex
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-1
                "
              >
                {/* ACTIVE TAB */}
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="
                    absolute top-1 bottom-1
                    w-[calc(50%-4px)]
                    rounded-xl
                    bg-white
                  "
                  style={{
                    left: isLogin
                      ? "4px"
                      : "calc(50%)",
                  }}
                />

                <button
                  onClick={() =>
                    setIsLogin(true)
                  }
                  className={`
                    relative z-10 flex-1
                    rounded-xl py-2.5
                    text-sm font-semibold
                    transition-all duration-300
                    ${
                      isLogin
                        ? "text-black"
                        : "text-slate-400"
                    }
                  `}
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    setIsLogin(false)
                  }
                  className={`
                    relative z-10 flex-1
                    rounded-xl py-2.5
                    text-sm font-semibold
                    transition-all duration-300
                    ${
                      !isLogin
                        ? "text-black"
                        : "text-slate-400"
                    }
                  `}
                >
                  Register
                </button>
              </div>
            </div>

            {/* FORMS */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <LoginForm
                    defaultLogin={
                      prefilledLogin
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <RegisterForm
                    switchToLogin={
                      handleSwitchToLogin
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
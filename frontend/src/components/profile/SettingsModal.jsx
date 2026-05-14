// src/components/profile/SettingsModal.jsx

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  ShieldCheck,
  EnvelopeSimple,
  LockKey,
  Eye,
  SignOut,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

import { authService }
  from "../../services/authService";

import {
  logout,
  updateUser,
} from "../../features/auth/authSlice";

export default function SettingsModal({
  open,
  onClose,
  user,
}) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [
    activeSection,
    setActiveSection,
  ] = useState("account");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    apiError,
    setApiError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    isPrivate,
    setIsPrivate,
  ] = useState(
    user?.is_private || false
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* CLEAR ALERTS */
  const clearMessages = () => {

    setApiError("");

    setSuccessMessage("");
  };

  /* SWITCH SECTION */
  const handleSectionChange =
    (section) => {

      clearMessages();

      reset();

      setActiveSection(section);
    };

  /* LOGOUT ALL DEVICES */
  const handleLogoutAllDevices =
    async () => {

      try {

        setLoading(true);

        clearMessages();

        await authService.logoutAllDevices();

        dispatch(logout());

        navigate("/");

      } catch (error) {

        console.log(error);

        setApiError(
          "Failed to logout from all devices"
        );

      } finally {

        setLoading(false);
      }
    };

  /* UPDATE EMAIL */
  const handleEmailUpdate =
    async (data) => {

      try {

        setLoading(true);

        clearMessages();

        const response =
          await authService.updateEmail({
            email: data.email,
          });

        dispatch(
          updateUser(response)
        );

        setSuccessMessage(
          "Email updated successfully"
        );

        reset();

      } catch (error) {

        console.log(error);

        setApiError(
          error?.response?.data
            ?.detail ||
          "Failed to update email"
        );

      } finally {

        setLoading(false);
      }
    };

  /* UPDATE PASSWORD */
  const handlePasswordUpdate =
    async (data) => {

      try {

        setLoading(true);

        clearMessages();

        await authService.changePassword({
          current_password:
            data.current_password,

          new_password:
            data.new_password,
        });

        setSuccessMessage(
          "Password updated successfully"
        );

        reset();

      } catch (error) {

        console.log(error);

        const errorData =
          error?.response?.data;

        if (
          errorData?.new_password
        ) {

          setApiError(
            errorData.new_password[0]
          );

        } else if (
          errorData?.detail
        ) {

          setApiError(
            errorData.detail
          );

        } else {

          setApiError(
            "Failed to update password"
          );
        }

      } finally {

        setLoading(false);
      }
    };

  /* TOGGLE PRIVACY */
  const handlePrivacyToggle =
    async () => {

      try {

        setLoading(true);

        clearMessages();

        const response =
          await authService.updatePrivacy({
            is_private:
              !isPrivate,
          });

        setIsPrivate(
          response.is_private
        );

        dispatch(
          updateUser(response)
        );

        setSuccessMessage(
          response.is_private
            ? "Account is now private"
            : "Account is now public"
        );

      } catch (error) {

        console.log(error);

        setApiError(
          "Failed to update privacy"
        );

      } finally {

        setLoading(false);
      }
    };

  /* DEACTIVATE ACCOUNT */
  const handleDeactivate =
    async () => {

      const confirmed =
        window.confirm(
          "Deactivate your account?"
        );

      if (!confirmed) return;

      try {

        setLoading(true);

        clearMessages();

        await authService.deactivateAccount();

        dispatch(logout());

        navigate("/");

      } catch (error) {

        console.log(error);

        setApiError(
          "Failed to deactivate account"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed inset-0 z-[70]
            bg-black/80
            backdrop-blur-md
            p-3 sm:p-5
          "
        >
          <div
            className="
              flex min-h-full
              items-center
              justify-center
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 30,
              }}
              transition={{
                duration: 0.22,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-4xl
                overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-[#0B1120]/95
                shadow-[0_0_80px_rgba(99,102,241,0.12)]
                backdrop-blur-3xl
              "
            >

              {/* TOP GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0
                  h-44
                  bg-gradient-to-r
                  from-indigo-500/20
                  via-cyan-500/10
                  to-pink-500/20
                  blur-3xl
                "
              />

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="
                  absolute
                  right-5
                  top-5
                  z-50
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111827]/90
                  text-slate-400
                  backdrop-blur-xl
                  transition-all
                  hover:scale-105
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                <X size={18} />
              </button>

              {/* MAIN */}
              <div
                className="
                  relative z-10
                  grid gap-6
                  lg:grid-cols-[240px_1fr]
                  p-5 sm:p-7
                "
              >

                {/* SIDEBAR */}
                <div
                  className="
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <div className="pr-12">
                    <h2
                      className="
                        text-3xl
                        font-black
                        text-white
                      "
                    >
                      Settings
                    </h2>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-400
                      "
                    >
                      Manage your
                      account privacy,
                      security and
                      preferences.
                    </p>
                  </div>

                  {/* NAV */}
                  <div className="mt-8 space-y-2">

                    {/* ACCOUNT */}
                    <button
                      onClick={() =>
                        handleSectionChange(
                          "account"
                        )
                      }
                      className={`
                        group flex w-full
                        items-center gap-3
                        rounded-2xl
                        px-4 py-3.5
                        transition-all

                        ${activeSection ===
                          "account"
                          ? `
                              bg-indigo-500/15
                              border border-indigo-500/20
                              text-white
                            `
                          : `
                              text-slate-400
                              hover:bg-white/[0.05]
                              hover:text-white
                            `
                        }
                      `}
                    >
                      <EnvelopeSimple
                        size={20}
                        weight="duotone"
                      />

                      Account
                    </button>

                    {/* SECURITY */}
                    <button
                      onClick={() =>
                        handleSectionChange(
                          "security"
                        )
                      }
                      className={`
                        group flex w-full
                        items-center gap-3
                        rounded-2xl
                        px-4 py-3.5
                        transition-all

                        ${activeSection ===
                          "security"
                          ? `
                              bg-indigo-500/15
                              border border-indigo-500/20
                              text-white
                            `
                          : `
                              text-slate-400
                              hover:bg-white/[0.05]
                              hover:text-white
                            `
                        }
                      `}
                    >
                      <ShieldCheck
                        size={20}
                        weight="duotone"
                      />

                      Security
                    </button>

                    {/* PRIVACY */}
                    <button
                      onClick={() =>
                        handleSectionChange(
                          "privacy"
                        )
                      }
                      className={`
                        group flex w-full
                        items-center gap-3
                        rounded-2xl
                        px-4 py-3.5
                        transition-all

                        ${activeSection ===
                          "privacy"
                          ? `
                              bg-indigo-500/15
                              border border-indigo-500/20
                              text-white
                            `
                          : `
                              text-slate-400
                              hover:bg-white/[0.05]
                              hover:text-white
                            `
                        }
                      `}
                    >
                      <Eye
                        size={20}
                        weight="duotone"
                      />

                      Privacy
                    </button>
                  </div>

                  {/* LOGOUT */}
                  <div
                    className="
                      mt-8
                      border-t
                      border-white/10
                      pt-6
                    "
                  >
                    <button
                      onClick={
                        handleLogoutAllDevices
                      }
                      disabled={loading}
                      className="
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-5 py-3.5
                        text-sm
                        font-medium
                        text-red-300
                        transition-all
                        hover:bg-red-500/20
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <SignOut
                        size={18}
                        weight="bold"
                      />

                      Logout All Devices
                    </button>
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div
                  className="
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.03]
                    p-5 sm:p-6
                  "
                >
                  <AnimatePresence
                    mode="wait"
                  >

                    {/* ACCOUNT */}
                    {activeSection ===
                      "account" && (
                        <motion.div
                          key="account"
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
                            duration: 0.18,
                          }}
                        >
                          <h3
                            className="
                            text-3xl
                            font-black
                            text-white
                          "
                          >
                            Change Email
                          </h3>

                          <p
                            className="
                            mt-3
                            text-sm
                            leading-7
                            text-slate-400
                          "
                          >
                            Update your
                            account email
                            address securely.
                          </p>

                          <form
                            onSubmit={handleSubmit(
                              handleEmailUpdate
                            )}
                            className="
                            mt-8
                            space-y-5
                          "
                          >
                            <Input
                              label="New Email"
                              placeholder="Enter new email"
                              type="email"
                              icon={
                                <EnvelopeSimple
                                  size={18}
                                  weight="duotone"
                                />
                              }
                              error={
                                errors.email
                                  ?.message
                              }
                              {...register(
                                "email",
                                {
                                  required:
                                    "Email is required",
                                }
                              )}
                            />

                            <Button
                              type="submit"
                              loading={loading}
                              className="
                              h-12 px-8
                            "
                            >
                              Update Email
                            </Button>
                          </form>
                        </motion.div>
                      )}

                    {/* SECURITY */}
                    {activeSection ===
                      "security" && (
                        <motion.div
                          key="security"
                          initial={{
                            opacity: 0,
                            y: 12,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -12,
                            scale: 0.98,
                          }}
                          transition={{
                            duration: 0.22,
                            ease: "easeOut",
                          }}
                        >
                          <h3
                            className="
          text-3xl
          font-black
          text-white
        "
                          >
                            Change Password
                          </h3>

                          <p
                            className="
          mt-3
          text-sm
          leading-7
          text-slate-400
        "
                          >
                            Use a strong password
                            to secure your account.
                          </p>

                          <form
                            onSubmit={handleSubmit(
                              handlePasswordUpdate
                            )}
                            className="
          mt-8
          space-y-5
        "
                          >
                            {/* CURRENT PASSWORD */}
                            <Input
                              label="Current Password"
                              placeholder="Current password"
                              type="password"
                              icon={
                                <LockKey
                                  size={18}
                                  weight="duotone"
                                />
                              }
                              className="pr-14  hide-password-toggle"
                              error={
                                errors
                                  .current_password
                                  ?.message
                              }
                              {...register(
                                "current_password",
                                {
                                  required:
                                    "Current password is required",
                                }
                              )}
                            />

                            {/* NEW PASSWORD */}
                            <Input
                              label="New Password"
                              placeholder="New password"
                              type="password"
                              icon={
                                <LockKey
                                  size={18}
                                  weight="duotone"
                                />
                              }
                              className="pr-14  hide-password-toggle"
                              error={
                                errors
                                  .new_password
                                  ?.message
                              }
                              {...register(
                                "new_password",
                                {
                                  required:
                                    "New password is required",
                                }
                              )}
                            />

                            <Button
                              type="submit"
                              loading={loading}
                              className="
            h-12
            px-8
          "
                            >
                              Update Password
                            </Button>
                          </form>
                        </motion.div>
                      )}

                    {/* PRIVACY */}
                    {activeSection ===
                      "privacy" && (
                        <motion.div
                          key="privacy"
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
                            duration: 0.18,
                          }}
                        >
                          <h3
                            className="
                            text-3xl
                            font-black
                            text-white
                          "
                          >
                            Privacy Settings
                          </h3>

                          <p
                            className="
                            mt-3
                            text-sm
                            leading-7
                            text-slate-400
                          "
                          >
                            Control who can
                            access your profile.
                          </p>

                          <div
                            className="
                            mt-8
                            space-y-5
                          "
                          >
                            {/* PRIVATE */}
                            <div
                              className="
                              flex items-center
                              justify-between
                              rounded-3xl
                              border border-white/10
                              bg-white/[0.03]
                              p-5
                            "
                            >
                              <div>
                                <h4
                                  className="
                                  text-lg
                                  font-bold
                                  text-white
                                "
                                >
                                  Private Account
                                </h4>

                                <p
                                  className="
                                  mt-1
                                  text-sm
                                  text-slate-400
                                "
                                >
                                  Only approved
                                  followers can
                                  view your profile.
                                </p>
                              </div>

                              <button
                                onClick={
                                  handlePrivacyToggle
                                }
                                disabled={loading}
                                className={`
                                relative
                                h-7
                                w-14
                                rounded-full
                                transition-all

                                ${isPrivate
                                    ? `
                                      bg-indigo-500
                                    `
                                    : `
                                      bg-white/10
                                    `
                                  }
                              `}
                              >
                                <span
                                  className={`
                                  absolute top-1
                                  h-5 w-5
                                  rounded-full
                                  bg-white
                                  transition-all

                                  ${isPrivate
                                      ? `
                                        left-8
                                      `
                                      : `
                                        left-1
                                      `
                                    }
                                `}
                                />
                              </button>
                            </div>

                            {/* DEACTIVATE */}
                            <div
                              className="
                              rounded-3xl
                              border
                              border-yellow-500/20
                              bg-yellow-500/10
                              p-5
                            "
                            >
                              <div
                                className="
                                flex items-start
                                gap-3
                              "
                              >
                                <WarningCircle
                                  size={22}
                                  className="
                                  mt-0.5
                                  text-yellow-300
                                "
                                />

                                <div>
                                  <h4
                                    className="
                                    font-bold
                                    text-yellow-200
                                  "
                                  >
                                    Deactivate Account
                                  </h4>

                                  <p
                                    className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-yellow-100/80
                                  "
                                  >
                                    Temporarily hide
                                    your account from
                                    ConnectSphere.
                                  </p>

                                  <button
                                    onClick={
                                      handleDeactivate
                                    }
                                    disabled={loading}
                                    className="
                                    mt-4
                                    rounded-2xl
                                    border
                                    border-yellow-400/20
                                    bg-yellow-400/10
                                    px-5 py-3
                                    text-sm
                                    font-medium
                                    text-yellow-200
                                    transition-all
                                    hover:bg-yellow-400/20
                                    disabled:opacity-50
                                  "
                                  >
                                    Deactivate
                                    Account
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>

                  {/* ERROR */}
                  {apiError && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        mt-6
                        flex items-center
                        gap-3
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/10
                        p-4
                        text-sm
                        text-red-300
                      "
                    >
                      <WarningCircle
                        size={18}
                      />

                      {apiError}
                    </motion.div>
                  )}

                  {/* SUCCESS */}
                  {successMessage && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        mt-6
                        flex items-center
                        gap-3
                        rounded-2xl
                        border border-emerald-500/20
                        bg-emerald-500/10
                        p-4
                        text-sm
                        text-emerald-300
                      "
                    >
                      <CheckCircle
                        size={18}
                      />

                      {successMessage}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
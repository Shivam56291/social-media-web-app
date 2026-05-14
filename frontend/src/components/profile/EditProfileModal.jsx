// src/components/profile/EditProfileModal.jsx

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { showToast } from "../../utils/toast";

import {
  X,
  SignOut,
  Gear,
  User,
  Camera,
  NotePencil,
  SpinnerGap,
} from "@phosphor-icons/react";

import { useForm } from "react-hook-form";

import {
  useDispatch,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

import SettingsModal
  from "./SettingsModal";

import { authService }
  from "../../services/authService";

import { uploadImage }
  from "../../services/cloudinaryService";

import {
  updateUser,
  logout,
} from "../../features/auth/authSlice";

export default function EditProfileModal({
  open,
  onClose,
  user,
}) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [
    settingsOpen,
    setSettingsOpen,
  ] = useState(false);

  const [apiError, setApiError] =
    useState("");

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username:
        user?.username || "",

      first_name:
        user?.first_name || "",

      last_name:
        user?.last_name || "",

      bio:
        user?.bio || "",

      avatar_url:
        user?.avatar_url || "",
    },
  });

  const previewAvatar =
    watch("avatar_url");

  const previewUsername =
    watch("username");

  /* LOGOUT */
  const handleLogout = () => {

    dispatch(logout());

    navigate("/");
  };

  /* IMAGE UPLOAD */
  const handleImageChange =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        setUploadingImage(true);

        setApiError("");

        const imageUrl =
          await uploadImage(file);

        setValue(
          "avatar_url",
          imageUrl
        );

      } catch (error) {

        console.log(error);

        showToast.error("Image upload failed. Try again ✨");

      } finally {

        setUploadingImage(false);
      }
    };

  /* SUBMIT */
  const onSubmit = async (data) => {

    if (uploadingImage) return;

    try {

      setLoading(true);

      setApiError("");

      const response =
        await authService.updateProfile(
          data
        );

      dispatch(
        updateUser(response)
      );

      showToast.success("Profile updated successfully ✨");

      onClose();

    } catch (error) {

      console.log(error);

      showToast.error("Profile update failed. Please try again ✨");

    } finally {

      setLoading(false);
    }
  };

  return (
    <AnimatePresence>

      {open && !settingsOpen && (

        <motion.div
          key="edit-profile-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed inset-0 z-50
            bg-black/70
            p-3 sm:p-5
            backdrop-blur-md
          "
        >

          {/* CENTER */}
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
                y: 24,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 24,
              }}
              transition={{
                duration: 0.22,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative w-full
                max-w-3xl
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
                  h-32
                  bg-gradient-to-r
                  from-indigo-500/20
                  via-cyan-500/10
                  to-pink-500/20
                  blur-3xl
                "
              />

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="
                  absolute right-5 top-5
                  z-30
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-[#111827]
                  text-slate-400
                  transition-all
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                <X size={18} />
              </button>

              {/* CONTENT */}
              <div
                className="
                  relative z-10
                  p-5 sm:p-7
                "
              >

                {/* HEADER */}
                <div
                  className="
                    mb-6 flex
                    flex-col gap-5
                    pr-16
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                  "
                >

                  <div className="max-w-xl">

                    <h2
                      className="
                        text-3xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-4xl
                      "
                    >
                      Edit Profile
                    </h2>

                    <p
                      className="
                        mt-3
                        text-sm leading-7
                        text-slate-400
                      "
                    >
                      Update your public
                      profile information and
                      personalize your
                      ConnectSphere account.
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div
                    className="
                      flex w-full gap-3
                      sm:w-auto
                    "
                  >

                    {/* SETTINGS */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettingsOpen(true)
                      }
                      className="
                        flex h-12 flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        px-6
                        text-sm font-medium
                        text-slate-300
                        transition-all
                        hover:bg-white/[0.08]
                        sm:min-w-[140px]
                      "
                    >
                      <Gear
                        size={18}
                        weight="duotone"
                      />

                      Settings
                    </button>

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="
                        flex h-12 flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/10
                        px-6
                        text-sm font-medium
                        text-red-300
                        transition-all
                        hover:bg-red-500/20
                        sm:min-w-[140px]
                      "
                    >
                      <SignOut
                        size={18}
                        weight="bold"
                      />

                      Logout
                    </button>

                  </div>
                </div>

                {/* PROFILE CARD */}
                <div
                  className="
                    mb-6 flex
                    flex-col gap-5
                    rounded-[28px]
                    border border-white/10
                    bg-white/[0.03]
                    p-5
                    sm:flex-row
                    sm:items-center
                  "
                >

                  {/* AVATAR */}
                  <div
                    className="
                      flex justify-center
                    "
                  >

                    <div className="relative">

                      <div
                        className="
                          flex h-28 w-28
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          bg-gradient-to-br
                          from-indigo-500
                          via-cyan-500
                          to-pink-500
                          p-[3px]
                        "
                      >

                        <div
                          className="
                            relative flex
                            h-full w-full
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            bg-[#070B14]
                          "
                        >

                          {previewAvatar ? (

                            <img
                              src={
                                previewAvatar
                              }
                              alt={
                                previewUsername
                              }
                              className="
                                h-full
                                w-full
                                object-cover
                              "
                            />

                          ) : (

                            <span
                              className="
                                text-4xl
                                font-black
                                text-white
                              "
                            >
                              {previewUsername
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </span>

                          )}

                          {/* OVERLAY */}
                          {uploadingImage && (

                            <div
                              className="
                                absolute inset-0
                                flex items-center
                                justify-center
                                bg-black/60
                                backdrop-blur-sm
                              "
                            >

                              <SpinnerGap
                                size={30}
                                className="
                                  animate-spin
                                  text-white
                                "
                              />

                            </div>

                          )}

                        </div>
                      </div>

                      {/* CAMERA */}
                      <label
                        className={`
                          absolute bottom-1
                          right-1
                          flex h-10 w-10
                          items-center
                          justify-center
                          rounded-full
                          border border-white/10
                          bg-[#111827]
                          text-white
                          transition-all
                          ${uploadingImage
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer hover:scale-105 hover:bg-[#1E293B]"
                          }
                        `}
                      >

                        {uploadingImage ? (

                          <SpinnerGap
                            size={18}
                            className="
                              animate-spin
                            "
                          />

                        ) : (

                          <Camera
                            size={18}
                            weight="fill"
                          />

                        )}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={
                            uploadingImage
                          }
                          onChange={
                            handleImageChange
                          }
                        />

                      </label>
                    </div>
                  </div>

                  {/* USER INFO */}
                  <div className="flex-1">

                    <h3
                      className="
                        text-2xl
                        font-black
                        break-all
                      "
                    >
                      {previewUsername ||
                        "Username"}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-slate-400
                        break-all
                      "
                    >
                      {user?.email}
                    </p>

                    {uploadingImage && (

                      <div
                        className="
                          mt-4 flex
                          items-center gap-2
                          text-sm
                          text-cyan-300
                        "
                      >

                        <SpinnerGap
                          size={16}
                          className="
                            animate-spin
                          "
                        />

                        Uploading image...

                      </div>

                    )}

                  </div>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit(
                    onSubmit
                  )}
                  className="space-y-5"
                >

                  {/* USERNAME */}
                  <Input
                    label="Username"
                    placeholder="Username"
                    disabled={
                      uploadingImage
                    }
                    icon={
                      <User
                        size={18}
                        weight="duotone"
                      />
                    }
                    error={
                      errors.username
                        ?.message
                    }
                    {...register(
                      "username",
                      {
                        required:
                          "Username is required",
                      }
                    )}
                  />

                  {/* NAMES */}
                  <div
                    className="
                      grid gap-5
                      sm:grid-cols-2
                    "
                  >

                    <Input
                      label="First Name"
                      placeholder="First name"
                      disabled={
                        uploadingImage
                      }
                      icon={
                        <User
                          size={18}
                          weight="duotone"
                        />
                      }
                      {...register(
                        "first_name"
                      )}
                    />

                    <Input
                      label="Last Name"
                      placeholder="Last name"
                      disabled={
                        uploadingImage
                      }
                      icon={
                        <User
                          size={18}
                          weight="duotone"
                        />
                      }
                      {...register(
                        "last_name"
                      )}
                    />

                  </div>

                  {/* BIO */}
                  <div>

                    <label
                      className="
                        mb-3 flex
                        items-center gap-2
                        text-sm font-medium
                        text-slate-300
                      "
                    >

                      <NotePencil
                        size={18}
                        weight="duotone"
                      />

                      Bio

                    </label>

                    <textarea
                      rows={4}
                      disabled={
                        uploadingImage
                      }
                      className="
                        w-full
                        rounded-[24px]
                        border border-white/10
                        bg-white/[0.03]
                        px-5 py-4
                        text-white
                        outline-none
                        transition-all
                        placeholder:text-slate-500
                        focus:border-cyan-400/40
                        focus:bg-white/[0.05]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                      placeholder="Tell people about yourself..."
                      {...register("bio")}
                    />

                  </div>

                  {/* ERROR */}
                  {apiError && (

                    <div
                      className="
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/10
                        p-4 text-sm
                        text-red-300
                      "
                    >
                      {apiError}
                    </div>

                  )}

                  {/* FOOTER */}
                  <div
                    className="
                      flex flex-col-reverse
                      gap-3
                      pt-1
                      sm:flex-row
                      sm:justify-end
                    "
                  >

                    <button
                      type="button"
                      onClick={onClose}
                      disabled={
                        loading ||
                        uploadingImage
                      }
                      className="
                        h-12
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        px-6
                        font-medium
                        transition-all
                        hover:bg-white/[0.08]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Cancel
                    </button>

                    <Button
                      type="submit"
                      disabled={
                        uploadingImage
                      }
                      loading={
                        loading
                      }
                      className="
                        h-12
                        w-full px-8
                        sm:w-auto
                      "
                    >
                      {uploadingImage
                        ? "Uploading..."
                        : "Save Changes"}
                    </Button>

                  </div>
                </form>

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* SETTINGS MODAL */}
      <SettingsModal
        open={settingsOpen}
        onClose={() =>
          setSettingsOpen(false)
        }
        user={user}
      />

    </AnimatePresence>
  );
}
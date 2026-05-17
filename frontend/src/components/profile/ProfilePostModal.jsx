import {
  X,
  DotsThree,
  CheckCircle,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
} from "react";

import {
  useSelector,
} from "react-redux";

import ProfileComments
  from "./ProfileComments";

import ProfilePostMenu
  from "./ProfilePostMenu";

import ProfilePostActions
  from "./ProfilePostActions";

import ProfileImageCarousel
  from "./ProfileImageCarousel";

export default function ProfilePostModal({
  post,
  open,
  onClose,
}) {

  const currentUser =
    useSelector(
      (state) => state.auth.user
    );

  // ESC CLOSE
  useEffect(() => {

    const handleKey =
      (event) => {

        if (
          event.key === "Escape"
        ) {

          onClose();
        }
      };

    if (open) {

      document.body.style.overflow =
        "hidden";

      window.addEventListener(
        "keydown",
        handleKey
      );
    }

    return () => {

      document.body.style.overflow =
        "auto";

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };

  }, [
    open,
    onClose,
  ]);

  if (!open || !post)
    return null;

  const hasImages =
    post.image_urls &&
    post.image_urls.length > 0;

  const formattedDate =
    new Date(
      post.created_at
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

  return (
    <AnimatePresence>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
        className="
          fixed inset-0
          z-[999]
          flex items-center
          justify-center
          bg-black/85
          p-2
          backdrop-blur-md
          md:p-6
        "
      >

        {/* MODAL */}
        <motion.div
          initial={{
            scale: 0.96,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.96,
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className={`
            relative
            h-[95vh]
            w-full
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-[#0A0F1C]
            shadow-2xl
            shadow-black/60
            ${
              hasImages
                ? `
                  max-w-7xl
                  lg:grid
                  lg:grid-cols-[1.1fr_0.9fr]
                `
                : `
                  max-w-2xl
                `
            }
          `}
        >

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute right-4
              top-4 z-50
              flex h-11
              w-11 items-center
              justify-center
              rounded-full
              border border-white/10
              bg-black/40
              text-white
              backdrop-blur-md
              transition-all
              hover:scale-105
              hover:bg-white/10
            "
          >

            <X size={20} />

          </button>

          {/* LEFT SIDE */}
          {hasImages && (

            <div
              className="
                relative
                hidden
                h-full
                overflow-hidden
                bg-black
                lg:block
              "
            >

              {/* IMAGE CAROUSEL */}
              <ProfileImageCarousel
                images={
                  post.image_urls
                }
              />

            </div>

          )}

          {/* RIGHT SIDE */}
          <div
            className="
              flex h-full
              flex-col
              bg-[#0B1220]
            "
          >

            {/* MOBILE IMAGE */}
            {hasImages && (

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-black
                  lg:hidden
                "
              >

                <ProfileImageCarousel
                  images={
                    post.image_urls
                  }
                />

              </div>

            )}

            {/* HEADER */}
            <div
              className="
                flex items-center
                justify-between
                border-b border-white/5
                px-5 py-4
              "
            >

              <div
                className="
                  flex items-center
                  gap-3
                "
              >

                {/* AVATAR */}
                <div
                  className="
                    relative
                    h-12 w-12
                    overflow-hidden
                    rounded-full
                    ring-2
                    ring-white/10
                  "
                >

                  {post
                    ?.author_detail
                    ?.avatar_url ? (

                    <img
                      src={
                        post
                          .author_detail
                          .avatar_url
                      }
                      alt=""
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex h-full
                        w-full
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-cyan-500
                        to-indigo-600
                        text-sm
                        font-bold
                        text-white
                      "
                    >

                      {
                        post
                          ?.author_detail
                          ?.username?.[0]
                      }

                    </div>

                  )}

                  {/* ONLINE DOT */}
                  <div
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-3.5 w-3.5
                      rounded-full
                      border-2
                      border-[#0B1220]
                      bg-emerald-400
                    "
                  />

                </div>

                {/* USER */}
                <div>

                  <div
                    className="
                      flex items-center
                      gap-1.5
                    "
                  >

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {
                        post
                          .author_detail
                          .username
                      }
                    </h3>

                    <CheckCircle
                      size={14}
                      weight="fill"
                      className="
                        text-cyan-400
                      "
                    />

                  </div>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-500
                    "
                  >
                    {formattedDate}
                  </p>

                </div>

              </div>

              {/* MENU */}
              <div
                className="
                  flex items-center
                  gap-2
                "
              >

                <ProfilePostMenu
                  isOwner={
                    currentUser?.id ===
                    post.author
                  }
                />

                {!(
                  currentUser?.id ===
                  post.author
                ) && (

                  <button
                    className="
                      flex h-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/5
                      px-4
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      hover:bg-white/10
                    "
                  >
                    Follow
                  </button>

                )}

              </div>

            </div>

            {/* BODY */}
            <div
              className="
                flex min-h-0
                flex-1
                flex-col
              "
            >

              {/* POST CONTENT */}
              {(post.content ||
                !hasImages) && (

                <div
                  className="
                    border-b
                    border-white/5
                    px-6 py-5
                  "
                >

                  {!hasImages && (

                    <div
                      className="
                        mb-6
                        overflow-hidden
                        rounded-3xl
                        border border-white/5
                        bg-gradient-to-br
                        from-[#111827]
                        via-[#0F172A]
                        to-[#111827]
                        p-8
                      "
                    >

                      <p
                        className="
                          whitespace-pre-wrap
                          text-[17px]
                          leading-9
                          text-slate-200
                        "
                      >
                        {post.content}
                      </p>

                    </div>

                  )}

                  {hasImages &&
                    post.content && (

                    <p
                      className="
                        whitespace-pre-wrap
                        text-[15px]
                        leading-8
                        text-slate-300
                      "
                    >
                      {post.content}
                    </p>

                  )}

                </div>

              )}

              {/* ACTIONS */}
              <div
                className="
                  border-b
                  border-white/5
                  px-5 py-4
                "
              >

                <ProfilePostActions
                  post={post}
                />

              </div>

              {/* COMMENTS */}
              <div
                className="
                  min-h-0
                  flex-1
                  overflow-hidden
                "
              >

                <ProfileComments
                  postId={post.id}
                />

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}
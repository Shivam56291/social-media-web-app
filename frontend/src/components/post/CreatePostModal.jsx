import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Image,
  Smiley,
  SpinnerGap,
  Sparkle,
} from "@phosphor-icons/react";

import { showToast }
  from "../../utils/toast";

import EmojiPickerBox
  from "./EmojiPickerBox";

import PostMediaPreview
  from "./PostMediaPreview";

export default function CreatePostModal({
  open,
  onClose,
  user,
}) {
  const [caption, setCaption] =
    useState("");

  const [showEmoji, setShowEmoji] =
    useState(false);

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const imageInputRef = useRef();

  const textareaRef = useRef();

  /* AUTO FOCUS */
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 200);
    }
  }, [open]);

  /* CLEANUP OBJECT URL */
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  /* IMAGE PICK */
  const handleImagePick = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /* REMOVE IMAGE */
  const removeMedia = () => {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImageFile(null);
    setImagePreview("");
  };

  /* EMOJI INSERT */
  const handleEmojiClick = (
    emojiData
  ) => {
    const emoji =
      emojiData.emoji;

    const textarea =
      textareaRef.current;

    if (!textarea) {
      setCaption(
        (prev) => prev + emoji
      );

      return;
    }

    const start =
      textarea.selectionStart;

    const end =
      textarea.selectionEnd;

    const newText =
      caption.slice(0, start) +
      emoji +
      caption.slice(end);

    setCaption(newText);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursor =
        start + emoji.length;

      textarea.setSelectionRange(
        cursor,
        cursor
      );
    });
  };

  /* SUBMIT */
  const handleCreatePost =
    async () => {
      try {
        setLoading(true);

        await new Promise((r) =>
          setTimeout(r, 1500)
        );

        showToast.success(
          "Post published ✨"
        );

        setCaption("");

        removeMedia();

        onClose();

      } catch (error) {
        console.log(error);

        showToast.error(
          "Failed to publish post"
        );

      } finally {
        setLoading(false);
      }
    };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed inset-0
          z-[100]
          overflow-y-auto
          bg-black/70
          backdrop-blur-md
          p-4
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
              y: 50,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            transition={{
              duration: 0.28,
            }}
            className="
              relative w-full
              max-w-2xl
              overflow-hidden
              rounded-[34px]
              border border-white/10
              bg-[#0B1120]/95
              shadow-[0_0_100px_rgba(6,182,212,0.18)]
              backdrop-blur-3xl
            "
          >
            {/* BACKGROUND GLOW */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-cyan-500/10
                via-indigo-500/5
                to-pink-500/10
              "
            />

            {/* HEADER */}
            <div
              className="
                relative flex
                items-center
                justify-between
                border-b border-white/10
                px-6 py-5
              "
            >
              <div>
                <h2
                  className="
                    text-2xl font-black
                  "
                >
                  Create Post
                </h2>

                <p
                  className="
                    mt-1 text-sm
                    text-slate-400
                  "
                >
                  Share your moment ✨
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  flex h-11 w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/[0.05]
                  transition-all
                  duration-300
                  hover:rotate-90
                  hover:bg-white/[0.08]
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="relative p-6">
              {/* USER */}
              <div
                className="
                  mb-6 flex
                  items-center gap-4
                "
              >
                <div
                  className="
                    flex h-14 w-14
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-indigo-500
                    font-bold
                  "
                >
                  {user?.avatar_url ? (
                    <img
                      src={
                        user.avatar_url
                      }
                      alt={
                        user.username
                      }
                      className="
                        h-full w-full
                        object-cover
                      "
                    />
                  ) : (
                    user?.username
                      ?.charAt(0)
                      ?.toUpperCase()
                  )}
                </div>

                <div>
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                    "
                  >
                    {user?.username}
                  </h3>

                  <p
                    className="
                      mt-1 text-sm
                      text-slate-400
                    "
                  >
                    Your followers can
                    see this post
                  </p>
                </div>
              </div>

              {/* TEXTAREA */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={caption}
                  maxLength={500}
                  onChange={(e) =>
                    setCaption(
                      e.target.value
                    )
                  }
                  placeholder="What's happening today?"
                  className="
                    min-h-[190px]
                    w-full resize-none
                    rounded-[28px]
                    border border-white/10
                    bg-white/[0.04]
                    p-5
                    pr-16
                    text-[15px]
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/30
                    focus:bg-white/[0.06]
                    focus:shadow-[0_0_30px_rgba(6,182,212,0.12)]
                  "
                />

                {/* EMOJI BUTTON */}
                <button
                  onClick={() =>
                    setShowEmoji(
                      !showEmoji
                    )
                  }
                  className="
                    absolute bottom-4 left-4
                    flex h-11 w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/[0.05]
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-yellow-500/10
                  "
                >
                  <Smiley
                    size={22}
                    className="
                      text-yellow-300
                    "
                  />
                </button>

                {/* CHARACTER */}
                <div
                  className="
                    absolute bottom-5 right-5
                    text-xs
                    text-slate-500
                  "
                >
                  {caption.length}/500
                </div>

                {/* PICKER */}
                <AnimatePresence>
                  {showEmoji && (
                    <EmojiPickerBox
                      onEmojiClick={
                        handleEmojiClick
                      }
                      onClose={() =>
                        setShowEmoji(
                          false
                        )
                      }
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* MEDIA */}
              <PostMediaPreview
                imagePreview={imagePreview}
                removeMedia={removeMedia}
                onPickImage={() =>
                  imageInputRef.current.click()
                }
              />

              {/* FOOTER */}
              <div
                className="
                  mt-6 flex
                  items-center
                  justify-between
                "
              >

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImagePick}
                />

                {/* POST */}
                <button
                  disabled={
                    loading ||
                    (!caption.trim() &&
                      !imagePreview)
                  }
                  onClick={
                    handleCreatePost
                  }
                  className="
                    flex items-center
                    gap-2 rounded-2xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-cyan-500
                    px-8 py-3
                    font-semibold
                    shadow-lg
                    shadow-cyan-500/20
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? (
                    <>
                      <SpinnerGap
                        size={18}
                        className="
                          animate-spin
                        "
                      />

                      Publishing...
                    </>
                  ) : (
                    <>
                      <Sparkle size={18} />
                      Publish
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Smiley,
  SpinnerGap,
  Sparkle,
} from "@phosphor-icons/react";

import { showToast }
  from "../../utils/toast";

import {
  addPost,
} from "../../features/feed/feedSlice";

import EmojiPickerBox
  from "./EmojiPickerBox";

import PostMediaPreview
  from "./PostMediaPreview";

import { postService }
  from "../../services/postService";

import { uploadImage }
  from "../../services/cloudinaryService";

export default function CreatePostModal({
  open,
  onClose,
  user,
}) {

  const dispatch = useDispatch();

  const [caption, setCaption] =
    useState("");

  const [showEmoji, setShowEmoji] =
    useState(false);

  const [imageUrls, setImageUrls] =
    useState([]);

  const [imagePreviews, setImagePreviews] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [apiError, setApiError] =
    useState("");

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

  /* CLEANUP */
  useEffect(() => {

    return () => {

      imagePreviews.forEach((preview) => {

        if (
          typeof preview === "string" &&
          preview.startsWith("blob:")
        ) {

          URL.revokeObjectURL(preview);

        }
      });
    };

  }, [imagePreviews]);

  /* RESET */
  const resetState = () => {

    imagePreviews.forEach((preview) => {

      if (
        typeof preview === "string" &&
        preview.startsWith("blob:")
      ) {

        URL.revokeObjectURL(preview);

      }
    });

    setCaption("");
    setImagePreviews([]);
    setImageUrls([]);
    setShowEmoji(false);
    setApiError("");
  };

  /* IMAGE PICK */
  const handleImagePick =
    async (e) => {

      const files =
        Array.from(e.target.files);

      if (!files.length) return;

      if (
        imagePreviews.length +
        files.length >
        10
      ) {

        showToast.error(
          "Maximum 10 photos allowed"
        );

        return;
      }

      try {

        setUploadingImage(true);

        setApiError("");

        const newPreviews = [];
        const uploadedUrls = [];

        for (const file of files) {

          if (
            !file.type.startsWith(
              "image/"
            )
          ) {
            continue;
          }

          if (
            file.size >
            5 * 1024 * 1024
          ) {

            showToast.error(
              "Each image must be under 5MB"
            );

            continue;
          }

          const preview =
            URL.createObjectURL(file);

          newPreviews.push(preview);

          const uploadedUrl =
            await uploadImage(file);

          uploadedUrls.push(
            uploadedUrl
          );
        }

        setImagePreviews(
          (prev) => [
            ...prev,
            ...newPreviews,
          ]
        );

        setImageUrls(
          (prev) => [
            ...prev,
            ...uploadedUrls,
          ]
        );

        if (uploadedUrls.length) {

          showToast.success(
            "Photos uploaded ✨"
          );

        }

      } catch (error) {

        console.log(error);

        setApiError(
          "Image upload failed"
        );

        showToast.error(
          "Upload failed"
        );

      } finally {

        setUploadingImage(false);
      }
    };

  /* REMOVE MEDIA */
  const removeMedia = (index) => {

    const preview =
      imagePreviews[index];

    if (
      typeof preview === "string" &&
      preview.startsWith("blob:")
    ) {

      URL.revokeObjectURL(
        preview
      );
    }

    setImagePreviews((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

    setImageUrls((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  /* EMOJI */
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

      if (uploadingImage) return;

      try {

        setLoading(true);

        setApiError("");

        const payload = {
          content:
            caption.trim(),
          image_urls:
            imageUrls,
        };

        const createdPost =
          await postService.createPost(
            payload
          );

        dispatch(
          addPost(createdPost)
        );

        onClose();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        resetState();

        showToast.success(
          "Post published ✨"
        );

      } catch (error) {

        console.log(error);

        setApiError(
          "Failed to publish post"
        );

        showToast.error(
          "Post publish failed"
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
        onClick={onClose}
        className="
          fixed inset-0
          z-[100]
          flex items-center
          justify-center
          bg-black/70
          backdrop-blur-md
          p-4
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
            duration: 0.25,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            relative
            flex
            w-full
            max-w-2xl
            flex-col
            overflow-hidden
            rounded-[34px]
            border border-white/10
            bg-[#0B1120]/95
            shadow-[0_0_100px_rgba(6,182,212,0.18)]
            backdrop-blur-3xl
          "
          style={{
            maxHeight: "92vh",
          }}
        >

          {/* HEADER */}
          <div
            className="
              flex items-center
              justify-between
              border-b border-white/10
              px-6 py-5
              shrink-0
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
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
                hover:rotate-90
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* SCROLLABLE BODY */}
          <div
            className="
              flex-1
              overflow-y-auto
              px-6 py-5
            "
          >

            {/* USER */}
            <div
              className="
                mb-5 flex
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
                  shrink-0
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
                  min-h-[110px]
                  max-h-[180px]
                  w-full
                  resize-none
                  rounded-[28px]
                  border border-white/10
                  bg-white/[0.04]
                  p-5
                  pr-16
                  text-[15px]
                  leading-7
                  outline-none
                  transition-all
                  placeholder:text-slate-500
                  focus:border-cyan-400/30
                "
              />

              {/* EMOJI */}
              <button
                type="button"
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
                "
              >
                <Smiley size={22} />
              </button>

              {/* COUNT */}
              <div
                className="
                  absolute bottom-5 right-5
                  text-xs
                  text-slate-500
                "
              >
                {caption.length}/500
              </div>

              {/* EMOJI PICKER */}
              <AnimatePresence>

                {showEmoji && (

                  <EmojiPickerBox
                    onEmojiClick={
                      handleEmojiClick
                    }
                    onClose={() =>
                      setShowEmoji(false)
                    }
                  />

                )}

              </AnimatePresence>
            </div>

            {/* MEDIA */}
            <PostMediaPreview
              imagePreviews={
                imagePreviews
              }
              removeMedia={
                removeMedia
              }
              onPickImage={() =>
                imageInputRef.current.click()
              }
            />

            {/* ERROR */}
            {apiError && (

              <div
                className="
                  mt-5 rounded-2xl
                  border border-red-500/20
                  bg-red-500/10
                  p-4 text-sm
                  text-red-300
                "
              >
                {apiError}
              </div>

            )}

          </div>

          {/* FOOTER */}
          <div
            className="
              flex items-center
              justify-between
              border-t border-white/10
              px-6 py-5
              shrink-0
            "
          >

            <input
              hidden
              type="file"
              accept="image/*"
              multiple
              ref={imageInputRef}
              onChange={
                handleImagePick
              }
            />

            <button
              type="button"
              onClick={() =>
                imageInputRef.current.click()
              }
              className="
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                px-5 py-3
                text-sm
                font-medium
                transition-all
                hover:bg-white/[0.08]
              "
            >
              Add Photos
            </button>

            <button
              disabled={
                loading ||
                uploadingImage ||
                (
                  !caption.trim() &&
                  imageUrls.length === 0
                )
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
                transition-all
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

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}
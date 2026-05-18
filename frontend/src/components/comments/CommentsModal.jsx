import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  X,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  formatDistanceToNow,
} from "date-fns";

import {
  useComments,
} from "../../hooks/useComments";

import CommentItem from "./CommentItem";

import CommentInput from "./CommentInput";

export default function CommentsModal({
  open,
  onClose,
  post,
}) {

  const {
    commentsState = {},
    initialize,
    fetchInitial,
    fetchMore,
  } = useComments(post.id);

  const {
    comments = [],
    loading = false,
    hasMore = true,
    initialized = false,
  } = commentsState || {};

  const scrollRef =
    useRef(null);

  const images =
    post.image_urls || [];

  const [
    activeImage,
    setActiveImage,
  ] = useState(0);

  /* INIT */
  useEffect(() => {

    if (!open) return;

    initialize();

    if (!initialized) {
      fetchInitial();
    }

  }, [open]);

  /* BODY LOCK */
  useEffect(() => {

    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [open]);

  /* ESC CLOSE */
  useEffect(() => {

    const handleKey =
      (e) => {

        if (e.key === "Escape") {
          onClose();
        }

        if (
          e.key === "ArrowRight"
        ) {
          nextImage();
        }

        if (
          e.key === "ArrowLeft"
        ) {
          prevImage();
        }
      };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [activeImage, images.length]);

  /* INFINITE */
  const handleScroll =
    async () => {

      const el =
        scrollRef.current;

      if (!el) return;

      if (
        loading ||
        !hasMore
      ) return;

      const nearBottom =
        el.scrollTop +
          el.clientHeight >=
        el.scrollHeight - 300;

      if (nearBottom) {
        await fetchMore();
      }
    };

  /* IMAGE NAV */
  const nextImage =
    () => {

      if (
        activeImage <
        images.length - 1
      ) {

        setActiveImage(
          (prev) => prev + 1
        );
      }
    };

  const prevImage =
    () => {

      if (
        activeImage > 0
      ) {

        setActiveImage(
          (prev) => prev - 1
        );
      }
    };

  return (
    <AnimatePresence>

      {open && (

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
          className="
            fixed inset-0
            z-[400]
            bg-black/80
            backdrop-blur-xl
            p-0 md:p-6
          "
        >

          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                relative
                flex
                h-full
                w-full
                overflow-hidden
                rounded-none
                border border-white/10
                bg-[#0b1120]
                md:h-[94vh]
                md:max-w-7xl
                md:rounded-[34px]
              "
            >

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="
                  absolute
                  right-5
                  top-5
                  z-50
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border border-white/10
                  bg-black/40
                  backdrop-blur-xl
                  transition-all
                  hover:scale-105
                  hover:bg-white/10
                "
              >
                <X size={24} />
              </button>

              {/* LEFT */}
              <div
                className="
                  relative
                  hidden
                  flex-1
                  overflow-hidden
                  bg-black
                  lg:flex
                "
              >

                {/* IMAGE */}
                {images.length > 0 ? (

                  <>
                    <AnimatePresence
                      mode="wait"
                    >

                      <motion.img
                        key={
                          images[
                            activeImage
                          ]
                        }
                        src={
                          images[
                            activeImage
                          ]
                        }
                        alt=""
                        initial={{
                          opacity: 0,
                          scale: 1.04,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                          absolute inset-0
                          h-full
                          w-full
                          object-cover
                        "
                      />

                    </AnimatePresence>

                    {/* OVERLAY */}
                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-black/20
                      "
                    />

                    {/* COUNT */}
                    {images.length > 1 && (

                      <div
                        className="
                          absolute
                          right-6
                          top-6
                          rounded-full
                          border border-white/10
                          bg-black/40
                          px-4 py-2
                          text-sm
                          backdrop-blur-xl
                        "
                      >
                        {activeImage + 1}
                        /
                        {images.length}
                      </div>

                    )}

                    {/* LEFT BTN */}
                    {activeImage > 0 && (

                      <button
                        onClick={prevImage}
                        className="
                          absolute
                          left-6
                          top-1/2
                          flex
                          h-14
                          w-14
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          border border-white/10
                          bg-black/40
                          backdrop-blur-xl
                          transition-all
                          hover:scale-105
                          hover:bg-black/70
                        "
                      >
                        <CaretLeft
                          size={28}
                        />
                      </button>

                    )}

                    {/* RIGHT BTN */}
                    {activeImage <
                      images.length -
                        1 && (

                      <button
                        onClick={nextImage}
                        className="
                          absolute
                          right-6
                          top-1/2
                          flex
                          h-14
                          w-14
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          border border-white/10
                          bg-black/40
                          backdrop-blur-xl
                          transition-all
                          hover:scale-105
                          hover:bg-black/70
                        "
                      >
                        <CaretRight
                          size={28}
                        />
                      </button>

                    )}

                    {/* THUMBNAILS */}
                    {images.length >
                      1 && (

                      <div
                        className="
                          absolute
                          bottom-6
                          left-1/2
                          flex
                          -translate-x-1/2
                          gap-3
                          rounded-2xl
                          border border-white/10
                          bg-black/30
                          p-3
                          backdrop-blur-xl
                        "
                      >

                        {images.map(
                          (
                            image,
                            index
                          ) => (

                            <button
                              key={
                                image
                              }
                              onClick={() =>
                                setActiveImage(
                                  index
                                )
                              }
                              className={`
                                overflow-hidden
                                rounded-xl
                                border-2
                                transition-all
                                ${
                                  activeImage ===
                                  index
                                    ? "border-cyan-400 scale-105"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }
                              `}
                            >

                              <img
                                src={
                                  image
                                }
                                alt=""
                                className="
                                  h-16
                                  w-16
                                  object-cover
                                "
                              />

                            </button>

                          )
                        )}

                      </div>

                    )}
                  </>

                ) : (

                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      p-14
                    "
                  >

                    <div
                      className="
                        max-w-2xl
                      "
                    >

                      <h2
                        className="
                          mb-6
                          text-4xl
                          font-bold
                        "
                      >
                        {post.author_detail?.username}
                      </h2>

                      <p
                        className="
                          whitespace-pre-wrap
                          text-lg
                          leading-9
                          text-slate-300
                        "
                      >
                        {post.content}
                      </p>

                    </div>

                  </div>

                )}

              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  w-full
                  flex-col
                  border-l border-white/10
                  lg:w-[460px]
                "
              >

                {/* HEADER */}
                <div
                  className="
                    border-b
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    backdrop-blur-xl
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    {/* AVATAR */}
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        bg-gradient-to-br
                        from-indigo-500
                        to-cyan-500
                        font-bold
                      "
                    >

                      {post.author_detail
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
                        post
                          .author_detail
                          ?.username?.charAt(
                            0
                          )
                          ?.toUpperCase()
                      )}

                    </div>

                    <div
                      className="flex-1"
                    >

                      <h2
                        className="
                          font-semibold
                        "
                      >
                        {
                          post
                            .author_detail
                            ?.username
                        }
                      </h2>

                      <p
                        className="
                          text-sm
                          text-slate-400
                        "
                      >
                        {formatDistanceToNow(
                          new Date(
                            post.created_at
                          ),
                          {
                            addSuffix:
                              true,
                          }
                        )}
                      </p>

                    </div>

                  </div>

                  {post.content && (

                    <p
                      className="
                        mt-5
                        whitespace-pre-wrap
                        leading-7
                        text-slate-300
                      "
                    >
                      {post.content}
                    </p>

                  )}

                </div>

                {/* COMMENTS */}
                <div
                  ref={scrollRef}
                  onScroll={
                    handleScroll
                  }
                  className="
                    flex-1
                    overflow-y-auto
                    px-5
                    py-6
                  "
                >

                  <div
                    className="
                      space-y-5
                    "
                  >

                    {comments.map(
                      (
                        comment
                      ) => (

                        <CommentItem
                          key={
                            comment.id
                          }
                          comment={
                            comment
                          }
                        />

                      )
                    )}

                    {loading && (

                      <div
                        className="
                          flex
                          justify-center
                          py-6
                        "
                      >

                        <div
                          className="
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-2
                            border-cyan-400
                            border-t-transparent
                          "
                        />

                      </div>

                    )}

                    {!loading &&
                      comments.length ===
                        0 && (

                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          py-20
                          text-center
                        "
                      >

                        <h3
                          className="
                            text-xl
                            font-semibold
                          "
                        >
                          No comments yet
                        </h3>

                        <p
                          className="
                            mt-2
                            text-sm
                            text-slate-400
                          "
                        >
                          Start the conversation.
                        </p>

                      </div>

                    )}

                    {!hasMore &&
                      comments.length >
                        0 && (

                      <div
                        className="
                          py-8
                          text-center
                          text-sm
                          text-slate-500
                        "
                      >
                        You reached the end
                      </div>

                    )}

                  </div>

                </div>

                {/* INPUT */}
                <div
                  className="
                    border-t
                    border-white/10
                    bg-[#0f172a]
                    p-4
                    backdrop-blur-xl
                  "
                >

                  <CommentInput
                    postId={post.id}
                  />

                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}
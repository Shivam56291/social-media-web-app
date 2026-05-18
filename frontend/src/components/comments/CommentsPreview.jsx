import {
  useEffect,
} from "react";

import {
  ChatCircleDots,
} from "@phosphor-icons/react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useComments,
} from "../../hooks/useComments";

import CommentItem from "./CommentItem";

import CommentInput from "./CommentInput";

export default function CommentsPreview({
  post,
  onOpenModal,
}) {

  const {
    commentsState,
    initialize,
    fetchInitial,
  } = useComments(post.id);

  useEffect(() => {

    initialize();

  }, []);

  useEffect(() => {

    fetchInitial();

  }, []);

  const comments =
    commentsState?.comments || [];

  const loading =
    commentsState?.loading;

  // newest comments first
  const previewComments =
    comments.slice(0, 2);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -6,
      }}
      transition={{
        duration: 0.22,
      }}
      className="
        border-t border-white/5
        bg-gradient-to-b
        from-white/[0.02]
        to-transparent
        px-5
        pb-5
      "
    >

      {/* HEADER */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          pt-2
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-400
            "
          >
            <ChatCircleDots
              size={16}
              weight="fill"
            />
          </div>

          <span>
            Recent comments
          </span>

        </div>

        {post.comments_count > 2 && (

          <button
            onClick={onOpenModal}
            className="
              group
              rounded-xl
              border border-white/5
              bg-white/[0.03]
              px-3 py-1.5
              text-xs
              font-medium
              text-slate-400
              transition-all
              duration-200
              hover:border-cyan-400/20
              hover:bg-cyan-500/10
              hover:text-cyan-300
            "
          >
            View all
            {" "}
            {post.comments_count}
          </button>

        )}

      </div>

      {/* COMMENTS */}
      <div
        className="
          space-y-3
        "
      >

        <AnimatePresence mode="popLayout">

          {loading ? (

            Array.from({
              length: 2,
            }).map((_, index) => (

              <div
                key={index}
                className="
                  animate-pulse
                  rounded-2xl
                  border border-white/5
                  bg-white/[0.03]
                  p-3
                "
              >

                <div
                  className="
                    mb-2
                    h-3
                    w-20
                    rounded-full
                    bg-white/10
                  "
                />

                <div
                  className="
                    h-3
                    w-full
                    rounded-full
                    bg-white/5
                  "
                />

              </div>

            ))

          ) : previewComments.length > 0 ? (

            previewComments.map(
              (comment) => (

                <motion.div
                  key={comment.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    rounded-2xl
                    border border-white/5
                    bg-white/[0.025]
                    px-4 py-3
                    transition-all
                    duration-200
                    hover:border-white/10
                    hover:bg-white/[0.04]
                  "
                >

                  <CommentItem
                    comment={comment}
                    compact
                  />

                </motion.div>

              )
            )

          ) : (

            <div
              className="
                rounded-2xl
                border border-dashed border-white/10
                bg-white/[0.02]
                px-5 py-8
                text-center
              "
            >

              <div
                className="
                  mx-auto mb-3
                  flex h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/[0.04]
                  text-slate-500
                "
              >
                <ChatCircleDots
                  size={22}
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                No comments yet
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                Start the conversation
              </p>

            </div>

          )}

        </AnimatePresence>

      </div>

      {/* INPUT */}
      <div className="mt-4">

        <CommentInput
          postId={post.id}
        />

      </div>

    </motion.div>
  );
}
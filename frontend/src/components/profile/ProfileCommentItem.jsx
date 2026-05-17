import {
  HeartStraight,
} from "@phosphor-icons/react";

import {
  motion,
} from "framer-motion";

import {
  useMemo,
  useState,
} from "react";

/* simple time formatter */
function formatTime(dateString) {

  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const diff = (now - date) / 1000;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;

  return date.toLocaleDateString();
}

export default function ProfileCommentItem({
  comment,
  optimistic = false,
  currentUserId,
  onLike,
}) {

  const user =
    comment.author_detail;

  const [liked, setLiked] =
    useState(false);

  const [likeCount, setLikeCount] =
    useState(comment.likes_count || 0);

  const time = useMemo(
    () => formatTime(comment.created_at),
    [comment.created_at]
  );

  const isOwn =
    currentUserId &&
    comment.author_id === currentUserId;

  const handleLike = () => {

    setLiked((p) => !p);

    setLikeCount((p) =>
      liked ? p - 1 : p + 1
    );

    onLike?.(comment.id, !liked);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.01,
      }}
      transition={{
        duration: 0.15,
      }}
      className={`
        group relative rounded-2xl
        border border-white/10
        p-4 backdrop-blur-xl
        transition-all
        ${
          isOwn
            ? "bg-white/[0.05]"
            : "bg-white/[0.03]"
        }
        ${
          optimistic
            ? "opacity-70"
            : "opacity-100"
        }
      `}
    >

      {/* TOP ROW */}
      <div
        className="
          flex items-start gap-3
        "
      >

        {/* AVATAR */}
        <div
          className="
            h-10 w-10 shrink-0
            overflow-hidden
            rounded-xl
            bg-gradient-to-br
            from-cyan-500
            to-indigo-500
            text-sm font-bold
            text-white
          "
        >

          {user?.avatar_url ? (

            <img
              src={user.avatar_url}
              alt={user.username}
              className="
                h-full w-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex h-full w-full
                items-center
                justify-center
              "
            >
              {user?.username
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

          )}

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* HEADER */}
          <div
            className="
              flex items-center
              justify-between
            "
          >

            <div
              className="
                flex items-center
                gap-2
              "
            >

              <p
                className="
                  text-sm font-semibold
                  text-white
                "
              >
                {user?.username}
              </p>

              <span
                className="
                  text-xs text-slate-500
                "
              >
                •
              </span>

              <p
                className="
                  text-xs text-slate-500
                "
              >
                {time}
              </p>

              {optimistic && (
                <span
                  className="
                    text-xs text-cyan-400
                  "
                >
                  sending...
                </span>
              )}

            </div>

            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className="
                opacity-0
                transition-all
                group-hover:opacity-100
                hover:scale-110
              "
            >

              <HeartStraight
                size={16}
                weight={
                  liked ? "fill" : "regular"
                }
                className={`
                  transition-colors
                  ${
                    liked
                      ? "text-pink-400"
                      : "text-slate-400"
                  }
                `}
              />

            </button>

          </div>

          {/* TEXT */}
          <p
            className="
              mt-2 text-sm
              leading-6
              text-slate-300
            "
          >
            {comment.content}
          </p>

          {/* FOOTER ACTIONS */}
          <div
            className="
              mt-2 flex items-center
              gap-4 text-xs
              text-slate-500
            "
          >

            <button
              onClick={handleLike}
              className="
                hover:text-white
                transition
              "
            >
              {likeCount > 0
                ? `${likeCount} likes`
                : "Like"}
            </button>

            <button
              className="
                hover:text-white
                transition
              "
            >
              Reply
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}
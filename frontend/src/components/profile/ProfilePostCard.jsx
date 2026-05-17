import {
  Heart,
  ChatCircle,
  Images,
  ShareFat, // Displayed for the shared/repost badge icon indicator
} from "@phosphor-icons/react";

import { motion } from "framer-motion";

import { useMemo } from "react";

export default function ProfilePostCard({
  post,
  onClick,
}) {

  // Extract parent post reference if it's a quote share / repost
  const isShared = !!post.parent_post_detail;
  const parentPost = post.parent_post_detail;
  const parentAuthor = parentPost?.author_detail;

  // Fallback to the original post's first image if this is a share post
  const cover = post.image_urls?.[0] || parentPost?.image_urls?.[0];

  // Count images from either the post itself or the shared parent post reference
  const imageCount = post.image_urls?.length || parentPost?.image_urls?.length || 0;

  const formattedDate =
    useMemo(() => {

      return new Date(
        post.created_at
      ).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      );

    }, [post.created_at]);

  return (
    <motion.button
      layout
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={onClick}
      className="
        group relative
        overflow-hidden
        rounded-2xl
        border border-white/5
        bg-[#0B1220]
        text-left
        shadow-xl
        shadow-black/20
      "
    >

      {/* IMAGE CONTAINER */}
      <div
        className="
          relative aspect-[4/5]
          overflow-hidden
          bg-[#111827]
        "
      >

        {cover ? (

          <img
            src={cover}
            alt=""
            loading="lazy"
            className="
              h-full w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
          />

        ) : (

          <div
            className="
              flex h-full
              items-center
              justify-center
              p-8
            "
          >

            <p
              className="
                line-clamp-6
                text-lg
                leading-8
                text-slate-300
              "
            >
              {post.content || parentPost?.content}
            </p>

          </div>

        )}

        {/* Dynamic Gradient Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/95
            via-black/30
            to-black/40
          "
        />

        {/* TOP RIGHT PLACEMENT: MULTI-IMAGE OR SHARED LOGO INDICATION BADGE */}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          
          {/* Display Shared Logo badge + Real owner name if it is a share post */}
          {isShared && (
            <div
              className="
                flex
                items-center gap-1.5
                rounded-full
                bg-cyan-500/20
                border border-cyan-500/30
                px-3 py-1.5
                text-[11px]
                font-semibold
                text-cyan-400
                backdrop-blur-md
              "
            >
              <ShareFat size={14} weight="fill" />
              <span>@{parentAuthor?.username || "user"}</span>
            </div>
          )}

          {/* MULTI IMAGE COUNTER */}
          {imageCount > 1 && (
            <div
              className="
                flex
                items-center gap-2
                rounded-full
                bg-black/50
                px-3 py-1.5
                text-xs
                font-medium
                text-white
                backdrop-blur-md
              "
            >
              <Images size={16} />
              {imageCount}
            </div>
          )}
        </div>

        {/* CONTENT CAPTION AND METRICS FOOTER OVERLAY */}
        <div
          className="
            absolute inset-x-0
            bottom-0 p-5
          "
        >

          {post.content ? (

            <p
              className="
                line-clamp-2
                text-sm
                leading-6
                text-white
              "
            >
              {post.content}
            </p>

          ) : isShared && parentPost?.content ? (

            /* Fallback display to the original post content if share caption text is blank */
            <p
              className="
                line-clamp-2
                text-sm
                leading-6
                text-slate-300
                italic
              "
            >
              "{parentPost.content}"
            </p>

          ) : null}

          {/* META DATA DETAILS */}
          <div
            className="
              mt-4 flex
              items-center
              justify-between
            "
          >

            <div
              className="
                flex items-center
                gap-5 text-sm
                text-slate-300
              "
            >

              <div
                className="
                  flex items-center
                  gap-1.5
                "
              >

                <Heart
                  size={16}
                  weight={
                    post.is_liked
                      ? "fill"
                      : "regular"
                  }
                />

                {post.likes_count}

              </div>

              <div
                className="
                  flex items-center
                  gap-1.5
                "
              >

                <ChatCircle size={16} />

                {post.comments_count}

              </div>

            </div>

            <span
              className="
                text-xs
                text-slate-500
              "
            >
              {formattedDate}
            </span>

          </div>

        </div>

      </div>

    </motion.button>
  );
}
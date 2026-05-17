import {
  Heart,
  ChatCircle,
  Images,
} from "@phosphor-icons/react";

import { motion } from "framer-motion";

import { useMemo } from "react";

export default function ProfilePostCard({
  post,
  onClick,
}) {

  const cover =
    post.image_urls?.[0];

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

      {/* IMAGE */}
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
              {post.content}
            </p>

          </div>

        )}

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/90
            via-black/10
            to-transparent
          "
        />

        {/* MULTI IMAGE */}
        {post.image_urls?.length > 1 && (

          <div
            className="
              absolute right-3
              top-3 flex
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

            {post.image_urls.length}

          </div>

        )}

        {/* CONTENT */}
        <div
          className="
            absolute inset-x-0
            bottom-0 p-5
          "
        >

          {post.content && (

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

          )}

          {/* META */}
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
import {
  DotsThree,
} from "@phosphor-icons/react";

import PostActions from "./PostActions";

export default function PostCard({
  user,
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400/20
      "
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div
            data-tooltip-id="global-tooltip"
            data-tooltip-content={user?.username}
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-cyan-500
              font-bold
            "
          >
            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">
              {user?.username}
            </h3>

            <p className="text-sm text-slate-400">
              2 hours ago
            </p>
          </div>
        </div>

        <button>
          <DotsThree
            size={24}
            className="text-slate-400"
          />
        </button>
      </div>

      <div
        className="
          h-[320px]
          bg-gradient-to-br
          from-indigo-500/30
          via-cyan-500/20
          to-pink-500/20
        "
      />

      <div className="p-5">
        <PostActions />

        <p className="leading-7 text-slate-300">
          Building a premium social media
          platform UI with React, Django,
          TailwindCSS, and modern motion
          animations ✨
        </p>
      </div>
    </article>
  );
}
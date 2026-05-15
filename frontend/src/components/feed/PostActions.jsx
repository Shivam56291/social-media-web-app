import {
  Heart,
  ChatCircleDots,
  TrendUp,
} from "@phosphor-icons/react";

export default function PostActions() {
  return (
    <div className="mb-4 flex items-center gap-5">
      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Like"
      >
        <Heart
          size={24}
          className="
            text-pink-400
            transition-all
            duration-300
            hover:scale-110
          "
          weight="fill"
        />
      </button>

      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Comments"
      >
        <ChatCircleDots
          size={24}
          className="
            text-slate-300
            hover:text-cyan-400
          "
        />
      </button>

      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Share Post"
      >
        <TrendUp
          size={24}
          className="
            text-slate-300
            hover:text-indigo-400
          "
        />
      </button>
    </div>
  );
}
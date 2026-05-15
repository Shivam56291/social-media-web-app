import {
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";

export default function FeedTopbar({
  onOpenModal,
}) {
  return (
    <div
      className="
        mb-8 flex
        items-center
        justify-between gap-4
      "
    >
      {/* SEARCH */}
      <div
        className="
          group flex flex-1
          items-center gap-3
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          px-5 py-3
          max-w-xl
          transition-all
          duration-300
          focus-within:border-cyan-400/40
          focus-within:bg-white/[0.06]
        "
      >
        <MagnifyingGlass
          size={20}
          className="
            text-slate-500
            transition-all
            duration-300
            group-focus-within:text-cyan-400
          "
        />

        <input
          type="text"
          placeholder="Search people, posts, communities..."
          className="
            w-full bg-transparent
            text-sm outline-none
            placeholder:text-slate-500
          "
        />
      </div>

      {/* CREATE POST BUTTON */}
      <button
        onClick={onOpenModal}
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Create Post"
        className="
          group relative
          flex h-12 w-12
          items-center justify-center
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500
          to-cyan-500
          shadow-lg
          shadow-indigo-500/20
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-cyan-500/30
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute inset-0
            bg-white/10
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        <Plus
          size={22}
          className="relative z-10"
        />
      </button>
    </div>
  );
}
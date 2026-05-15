export default function CommunityItem({
  name,
}) {
  return (
    <div
      className="
        flex items-center
        justify-between
      "
    >
      <div className="flex items-center gap-3">
        <div
          data-tooltip-id="global-tooltip"
          data-tooltip-content={name}
          className="
            h-12 w-12
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500/30
            to-cyan-500/30
            backdrop-blur-xl
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
          "
        />

        <div>
          <p className="font-medium">
            {name}
          </p>

          <p className="text-sm text-slate-400">
            12k members
          </p>
        </div>
      </div>

      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content={`Join ${name}`}
        className="
          rounded-xl
          bg-white
          px-4 py-2
          text-sm font-semibold
          text-black
          transition-all
          duration-300
          hover:scale-105
        "
      >
        Join
      </button>
    </div>
  );
}
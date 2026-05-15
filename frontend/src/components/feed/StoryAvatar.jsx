export default function StoryAvatar({
  name,
}) {
  return (
    <div
      data-tooltip-id="global-tooltip"
      data-tooltip-content={`${name}'s Story`}
      className="flex flex-col items-center"
    >
      <div
        className="
          group flex h-20 w-20
          items-center justify-center
          rounded-[28px]
          bg-gradient-to-br
          from-indigo-500
          to-cyan-500
          p-[2px]
          cursor-pointer
          transition-all
          duration-300
          hover:scale-105
        "
      >
        <div
          className="
            flex h-full w-full
            items-center justify-center
            rounded-[26px]
            bg-[#070B14]
            text-lg font-bold
          "
        >
          {name.charAt(0)}
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-300">
        {name}
      </p>
    </div>
  );
}
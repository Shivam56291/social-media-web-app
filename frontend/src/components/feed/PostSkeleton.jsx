export default function PostSkeleton() {

  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
      "
    >

      {/* HEADER */}
      <div
        className="
          flex items-center
          gap-4 p-5
        "
      >

        <div
          className="
            h-14 w-14
            rounded-2xl
            bg-white/10
          "
        />

        <div className="flex-1 space-y-2">

          <div
            className="
              h-4 w-40
              rounded-lg
              bg-white/10
            "
          />

          <div
            className="
              h-3 w-24
              rounded-lg
              bg-white/10
            "
          />

        </div>

      </div>

      {/* TEXT */}
      <div className="px-5 pb-4 space-y-3">

        <div
          className="
            h-4 w-full
            rounded-lg
            bg-white/10
          "
        />

        <div
          className="
            h-4 w-2/3
            rounded-lg
            bg-white/10
          "
        />

      </div>

      {/* IMAGE */}
      <div
        className="
          h-[420px]
          bg-white/10
        "
      />

      {/* ACTIONS */}
      <div
        className="
          flex gap-6
          p-5
        "
      >

        <div
          className="
            h-5 w-16
            rounded-lg
            bg-white/10
          "
        />

        <div
          className="
            h-5 w-16
            rounded-lg
            bg-white/10
          "
        />

      </div>

    </div>
  );
}
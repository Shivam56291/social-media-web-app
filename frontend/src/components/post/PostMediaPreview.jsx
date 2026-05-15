import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Sparkle,
  X,
  Image,
  ArrowsClockwise,
} from "@phosphor-icons/react";

export default function PostMediaPreview({
  imagePreview,
  removeMedia,
  onPickImage,
}) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="mt-5"
    >
      <div
        className="
          relative overflow-hidden
          rounded-[30px]
          border border-white/10
          bg-[#0F172A]
          shadow-[0_10px_60px_rgba(0,0,0,0.45)]
        "
      >
        {/* FIXED PREVIEW AREA */}
        <div
          onClick={
            !imagePreview
              ? onPickImage
              : undefined
          }
          className="
            relative aspect-[4/5]
            w-full
            max-h-[420px]
            min-h-[320px]
            overflow-hidden
            cursor-pointer
            bg-gradient-to-br
            from-[#0F172A]
            to-[#111827]
          "
        >
          {/* EMPTY STATE */}
          {!imagePreview && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                absolute inset-0
                flex flex-col
                items-center
                justify-center
                text-center
              "
            >
              {/* GLOW */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-cyan-500/5
                  via-indigo-500/5
                  to-pink-500/5
                "
              />

              {/* ICON */}
              <motion.div
                whileHover={{
                  scale: 1.06,
                }}
                className="
                  relative mb-6
                  flex h-24 w-24
                  items-center
                  justify-center
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                "
              >
                <Sparkle
                  size={42}
                  className="
                    text-cyan-300
                  "
                />
              </motion.div>

              <h3
                className="
                  text-xl font-bold
                "
              >
                Upload Photo
              </h3>

              <p
                className="
                  mt-3 max-w-[260px]
                  text-sm leading-6
                  text-slate-400
                "
              >
                Drag your audience into
                your moment with premium
                visuals ✨
              </p>
            </motion.div>
          )}

          {/* IMAGE */}
          <AnimatePresence>
            {imagePreview && (
              <motion.img
                key={imagePreview}
                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                src={imagePreview}
                alt="preview"
                className="
                  absolute inset-0
                  h-full w-full
                  object-cover
                "
              />
            )}
          </AnimatePresence>

          {/* OVERLAY */}
          {imagePreview && (
            <>
              {/* TOP FADE */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0
                  h-28
                  bg-gradient-to-b
                  from-black/70
                  to-transparent
                "
              />

              {/* BOTTOM FADE */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 bottom-0
                  h-32
                  bg-gradient-to-t
                  from-black/80
                  to-transparent
                "
              />
            </>
          )}
        </div>

        {/* CONTROLS */}
        {imagePreview && (
          <>
            {/* REMOVE */}
            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={removeMedia}
              className="
                absolute right-4 top-4
                z-20 flex h-11
                w-11 items-center
                justify-center
                rounded-full
                border border-white/10
                bg-black/50
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:bg-red-500/20
              "
            >
              <X size={18} />
            </motion.button>

            {/* PHOTO TAG */}
            <div
              className="
                absolute bottom-4 left-4
                flex items-center gap-2
                rounded-full
                border border-white/10
                bg-black/50
                px-4 py-2
                text-sm
                backdrop-blur-2xl
              "
            >
              <Image size={16} />
              Photo
            </div>

            {/* CHANGE */}
            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={onPickImage}
              className="
                absolute bottom-4 right-4
                flex items-center gap-2
                rounded-full
                border border-white/10
                bg-black/50
                px-4 py-2
                text-sm
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:bg-cyan-500/20
              "
            >
              <ArrowsClockwise
                size={16}
              />

              Change
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
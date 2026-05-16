import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  CaretLeft,
  CaretRight,
  Image,
  Plus,
  X,
} from "@phosphor-icons/react";

export default function PostMediaPreview({
  imagePreviews,
  removeMedia,
  onPickImage,
}) {

  const [activeIndex, setActiveIndex] =
    useState(0);

  const nextImage = () => {

    if (
      activeIndex <
      imagePreviews.length - 1
    ) {

      setActiveIndex(
        activeIndex + 1
      );
    }
  };

  const prevImage = () => {

    if (activeIndex > 0) {

      setActiveIndex(
        activeIndex - 1
      );
    }
  };

  if (
    !imagePreviews.length
  ) {

    return (
      <div
        onClick={onPickImage}
        className="
          mt-5 flex
          aspect-square
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-[32px]
          border border-dashed
          border-white/10
          bg-white/[0.03]
        "
      >
        <Plus size={42} />

        <p
          className="
            mt-4 text-sm
            text-slate-400
          "
        >
          Add photos
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">

      {/* MAIN IMAGE */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          rounded-[32px]
          bg-black
        "
      >

        <AnimatePresence mode="wait">

          <motion.img
            key={imagePreviews[activeIndex]}
            initial={{
              opacity: 0,
              scale: 1.03,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            src={
              imagePreviews[
                activeIndex
              ]
            }
            alt=""
            className="
              h-full
              w-full
              object-cover
            "
          />

        </AnimatePresence>

        {/* IMAGE COUNT */}
        <div
          className="
            absolute right-4 top-4
            rounded-full
            bg-black/60
            px-3 py-1
            text-xs
            backdrop-blur-xl
          "
        >
          {activeIndex + 1}/
          {imagePreviews.length}
        </div>

        {/* LEFT */}
        {activeIndex > 0 && (

          <button
            onClick={prevImage}
            className="
              absolute left-3 top-1/2
              flex h-10 w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/50
              backdrop-blur-xl
            "
          >
            <CaretLeft size={18} />
          </button>

        )}

        {/* RIGHT */}
        {activeIndex <
          imagePreviews.length - 1 && (

          <button
            onClick={nextImage}
            className="
              absolute right-3 top-1/2
              flex h-10 w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-black/50
              backdrop-blur-xl
            "
          >
            <CaretRight size={18} />
          </button>

        )}

        {/* REMOVE */}
        <button
          onClick={() =>
            removeMedia(activeIndex)
          }
          className="
            absolute bottom-4 right-4
            flex h-10 w-10
            items-center
            justify-center
            rounded-full
            bg-red-500/80
          "
        >
          <X size={18} />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div
        className="
          mt-4 flex gap-3
          overflow-x-auto
        "
      >

        {imagePreviews.map(
          (image, index) => (

            <button
              key={image}
              onClick={() =>
                setActiveIndex(index)
              }
              className={`
                relative h-20
                w-20 shrink-0
                overflow-hidden
                rounded-2xl
                border
                ${
                  activeIndex ===
                  index
                    ? "border-cyan-400"
                    : "border-white/10"
                }
              `}
            >

              <img
                src={image}
                alt=""
                className="
                  h-full w-full
                  object-cover
                "
              />

            </button>
          )
        )}

        {/* ADD MORE */}
        {imagePreviews.length <
          10 && (

          <button
            onClick={onPickImage}
            className="
              flex h-20
              w-20 shrink-0
              items-center
              justify-center
              rounded-2xl
              border border-dashed
              border-white/10
              bg-white/[0.03]
            "
          >
            <Image size={24} />
          </button>

        )}
      </div>
    </div>
  );
}
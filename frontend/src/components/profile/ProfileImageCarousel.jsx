import {
  CaretLeft,
  CaretRight,
  ArrowsOutSimple,
  Images,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
  useCallback,
} from "react";

export default function ProfileImageCarousel({
  images = [],
}) {

  const [
    active,
    setActive,
  ] = useState(0);

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const [
    direction,
    setDirection,
  ] = useState(0);

  // RESET LOADING
  useEffect(() => {

    setLoaded(false);

  }, [active]);

  // FIX ACTIVE INDEX
  useEffect(() => {

    if (
      active >
      images.length - 1
    ) {

      setActive(0);
    }

  }, [
    active,
    images.length,
  ]);

  // KEYBOARD SUPPORT
  useEffect(() => {

    const handleKey =
      (e) => {

        if (
          e.key === "ArrowRight"
        ) {

          next();
        }

        if (
          e.key === "ArrowLeft"
        ) {

          prev();
        }
      };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKey
      );
    };

  });

  const next =
    useCallback(() => {

      if (
        active <
        images.length - 1
      ) {

        setDirection(1);

        setActive(
          (prev) => prev + 1
        );
      }

    }, [
      active,
      images.length,
    ]);

  const prev =
    useCallback(() => {

      if (active > 0) {

        setDirection(-1);

        setActive(
          (prev) => prev - 1
        );
      }

    }, [active]);

  if (!images.length)
    return null;

  return (
    <div
      className="
        group relative
        h-full w-full
        overflow-hidden
        bg-black
      "
    >

      {/* BACKGROUND BLUR */}
      <div
        className="
          absolute inset-0
          scale-110 blur-3xl
        "
      >

        <img
          src={images[active]}
          alt=""
          className="
            h-full w-full
            object-cover
            opacity-30
          "
        />

      </div>

      {/* SHIMMER */}
      {!loaded && (

        <div
          className="
            absolute inset-0
            z-10 overflow-hidden
            bg-[#0F172A]
          "
        >

          <div
            className="
              absolute inset-0
              animate-pulse
              bg-gradient-to-r
              from-transparent
              via-white/5
              to-transparent
            "
          />

        </div>

      )}

      {/* IMAGE */}
      <AnimatePresence
        mode="wait"
        custom={direction}
      >

        <motion.img
          key={images[active]}
          src={images[active]}
          alt=""
          custom={direction}
          onLoad={() =>
            setLoaded(true)
          }
          initial={{
            opacity: 0,
            x:
              direction > 0
                ? 80
                : -80,
            scale: 1.03,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x:
              direction > 0
                ? -80
                : 80,
            scale: 0.98,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.7}
          onDragEnd={(
            _,
            info
          ) => {

            if (
              info.offset.x < -80
            ) {

              next();
            }

            if (
              info.offset.x > 80
            ) {

              prev();
            }
          }}
          className="
            absolute inset-0
            z-20 h-full
            w-full object-contain
            will-change-transform
            select-none
          "
        />

      </AnimatePresence>

      {/* CINEMATIC OVERLAYS */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          z-30
          bg-gradient-to-t
          from-black/60
          via-transparent
          to-black/30
        "
      />

      <div
        className="
          pointer-events-none
          absolute inset-y-0
          left-0 z-30
          w-32
          bg-gradient-to-r
          from-black/40
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute inset-y-0
          right-0 z-30
          w-32
          bg-gradient-to-l
          from-black/40
          to-transparent
        "
      />

      {/* TOP INFO */}
      <div
        className="
          absolute left-5
          top-5 z-40
          flex items-center
          gap-3
        "
      >

        {images.length > 1 && (

          <div
            className="
              flex items-center
              gap-2 rounded-full
              border border-white/10
              bg-black/40
              px-4 py-2
              text-sm
              font-medium
              text-white
              backdrop-blur-md
            "
          >

            <Images size={16} />

            {active + 1}
            /
            {images.length}

          </div>

        )}

      </div>

      {/* ACTION */}
      <button
        className="
          absolute right-5
          top-5 z-40
          flex h-11
          w-11 items-center
          justify-center
          rounded-full
          border border-white/10
          bg-black/40
          text-white
          opacity-0
          backdrop-blur-md
          transition-all
          duration-300
          group-hover:opacity-100
          hover:scale-105
          hover:bg-white/10
        "
      >

        <ArrowsOutSimple
          size={18}
        />

      </button>

      {/* LEFT */}
      {active > 0 && (

        <motion.button
          whileTap={{
            scale: 0.92,
          }}
          whileHover={{
            scale: 1.05,
          }}
          onClick={prev}
          className="
            absolute left-5
            top-1/2 z-40
            flex h-12 w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border border-white/10
            bg-black/40
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:opacity-100
            hover:bg-white/10
          "
        >

          <CaretLeft
            size={22}
            weight="bold"
          />

        </motion.button>

      )}

      {/* RIGHT */}
      {active <
        images.length - 1 && (

        <motion.button
          whileTap={{
            scale: 0.92,
          }}
          whileHover={{
            scale: 1.05,
          }}
          onClick={next}
          className="
            absolute right-5
            top-1/2 z-40
            flex h-12 w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border border-white/10
            bg-black/40
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:opacity-100
            hover:bg-white/10
          "
        >

          <CaretRight
            size={22}
            weight="bold"
          />

        </motion.button>

      )}

      {/* DOTS */}
      {images.length > 1 && (

        <div
          className="
            absolute bottom-6
            left-1/2 z-40
            flex -translate-x-1/2
            items-center gap-2
          "
        >

          {images.map(
            (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setActive(index)
                }
                className={`
                  relative overflow-hidden
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    active === index
                      ? `
                        h-2.5
                        w-8
                        bg-white
                      `
                      : `
                        h-2.5
                        w-2.5
                        bg-white/40
                        hover:bg-white/70
                      `
                  }
                `}
              />

            )
          )}

        </div>

      )}

    </div>
  );
}
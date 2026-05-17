import {
  DotsThree,
  Trash,
  PencilSimple,
  ShareFat,
  BookmarkSimple,
  Flag,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ProfilePostMenu({
  isOwner,
  onEdit,
  onDelete,
  onSave,
  onShare,
  onReport,
}) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const ref =
    useRef(null);

  // OUTSIDE CLICK
  useEffect(() => {

    const close =
      (event) => {

        if (
          ref.current &&
          !ref.current.contains(
            event.target
          )
        ) {

          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      close
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        close
      );
    };

  }, []);

  // ESC CLOSE
  useEffect(() => {

    const handleEscape =
      (event) => {

        if (
          event.key === "Escape"
        ) {

          setOpen(false);
        }
      };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };

  }, []);

  const handleAction =
    (callback) => {

      setOpen(false);

      if (callback) {

        callback();
      }
    };

  return (
    <div
      ref={ref}
      className="relative"
    >

      {/* TRIGGER */}
      <motion.button
        whileTap={{
          scale: 0.92,
        }}
        onClick={() =>
          setOpen(
            (prev) => !prev
          )
        }
        className={`
          flex h-10
          w-10 items-center
          justify-center
          rounded-xl
          border border-white/5
          transition-all
          duration-200
          ${
            open
              ? `
                bg-white/10
                text-white
              `
              : `
                bg-transparent
                text-slate-400
                hover:bg-white/5
                hover:text-white
              `
          }
        `}
      >

        <DotsThree
          size={20}
          weight="bold"
        />

      </motion.button>

      {/* MENU */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              absolute right-0
              top-12 z-[999]
              w-60
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-[#0F172A]/95
              shadow-2xl
              shadow-black/40
              backdrop-blur-2xl
            "
          >

            {/* HEADER */}
            <div
              className="
                border-b
                border-white/5
                px-4 py-3
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Post Actions
              </p>

            </div>

            {/* CONTENT */}
            <div className="p-2">

              {/* OWNER ACTIONS */}
              {isOwner && (

                <>

                  <MenuButton
                    icon={
                      <PencilSimple
                        size={18}
                      />
                    }
                    label="Edit Post"
                    onClick={() =>
                      handleAction(
                        onEdit
                      )
                    }
                  />

                  <MenuButton
                    danger
                    icon={
                      <Trash
                        size={18}
                      />
                    }
                    label="Delete Post"
                    onClick={() =>
                      handleAction(
                        onDelete
                      )
                    }
                  />

                  <div
                    className="
                      my-2 h-px
                      bg-white/5
                    "
                  />

                </>

              )}

              {/* COMMON ACTIONS */}
              <MenuButton
                icon={
                  <BookmarkSimple
                    size={18}
                  />
                }
                label="Save Post"
                onClick={() =>
                  handleAction(
                    onSave
                  )
                }
              />

              <MenuButton
                icon={
                  <ShareFat
                    size={18}
                  />
                }
                label="Share Post"
                onClick={() =>
                  handleAction(
                    onShare
                  )
                }
              />

              {!isOwner && (

                <>

                  <div
                    className="
                      my-2 h-px
                      bg-white/5
                    "
                  />

                  <MenuButton
                    danger
                    icon={
                      <Flag
                        size={18}
                      />
                    }
                    label="Report Post"
                    onClick={() =>
                      handleAction(
                        onReport
                      )
                    }
                  />

                </>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

/* =========================
   MENU BUTTON
========================= */

function MenuButton({
  icon,
  label,
  danger,
  onClick,
}) {

  return (
    <motion.button
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`
        group flex
        w-full items-center
        gap-3 rounded-xl
        px-3 py-3
        text-sm
        font-medium
        transition-all
        duration-200
        ${
          danger
            ? `
              text-red-400
              hover:bg-red-500/10
            `
            : `
              text-slate-200
              hover:bg-white/5
              hover:text-white
            `
        }
      `}
    >

      <div
        className={`
          flex h-9
          w-9 items-center
          justify-center
          rounded-xl
          transition-all
          ${
            danger
              ? `
                bg-red-500/10
                text-red-400
              `
              : `
                bg-white/5
                text-slate-300
                group-hover:bg-white/10
              `
          }
        `}
      >

        {icon}

      </div>

      <span className="flex-1 text-left">
        {label}
      </span>

    </motion.button>
  );
}
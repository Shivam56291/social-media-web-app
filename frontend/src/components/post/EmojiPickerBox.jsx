import {
  useEffect,
  useRef,
} from "react";

import {
  motion,
} from "framer-motion";

import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerBox({
  onEmojiClick,
  onClose,
}) {
  const pickerRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(
          e.target
        )
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [onClose]);

  return (
    <motion.div
      ref={pickerRef}
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
        duration: 0.2,
      }}
      className="
        absolute bottom-16 left-0
        z-50 overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-[#0F172A]
        shadow-[0_0_50px_rgba(6,182,212,0.15)]
        backdrop-blur-2xl
      "
    >
      <EmojiPicker
        theme="dark"
        onEmojiClick={onEmojiClick}
        lazyLoadEmojis
        
        width={340}
        height={420}
        previewConfig={{
          showPreview: false,
        }}
        skinTonesDisabled
      />
    </motion.div>
  );
}
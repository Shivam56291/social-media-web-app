import {
  PaperPlaneTilt,
} from "@phosphor-icons/react";

import {
  useRef,
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  createComment,
} from "../../features/comments/commentThunks";

export default function CommentInput({
  postId,
}) {

  const dispatch =
    useDispatch();

  const [
    content,
    setContent,
  ] = useState("");

  const [
    sending,
    setSending,
  ] = useState(false);

  const textareaRef =
    useRef(null);

  const autoResize =
    () => {

      const el =
        textareaRef.current;

      if (!el) return;

      el.style.height =
        "0px";

      el.style.height =
        `${el.scrollHeight}px`;
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const trimmed =
        content.trim();

      if (!trimmed) return;

      try {

        setSending(true);

        setContent("");

        dispatch(
          createComment(
            postId,
            trimmed
          )
        );

      } finally {

        setSending(false);

        requestAnimationFrame(
          autoResize
        );
      }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex items-end
        gap-3
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        px-4 py-3
      "
    >

      <textarea
        ref={textareaRef}
        rows={1}
        value={content}
        placeholder="Write a comment..."
        onChange={(e) => {

          setContent(
            e.target.value
          );

          autoResize();
        }}
        onKeyDown={(e) => {

          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {

            e.preventDefault();

            handleSubmit(e);
          }
        }}
        className="
          max-h-32
          flex-1
          resize-none
          overflow-y-auto
          bg-transparent
          text-sm
          text-white
          outline-none
          placeholder:text-slate-500
        "
      />

      <button
        type="submit"
        disabled={
          !content.trim() ||
          sending
        }
        className="
          mb-1
          flex h-10 w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-cyan-500
          transition-all
          hover:scale-105
          disabled:opacity-40
        "
      >

        <PaperPlaneTilt
          size={18}
          weight="fill"
        />

      </button>

    </form>
  );
}
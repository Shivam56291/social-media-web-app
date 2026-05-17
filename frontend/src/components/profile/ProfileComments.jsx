import {
  PaperPlaneTilt,
} from "@phosphor-icons/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import ProfileCommentItem
  from "./ProfileCommentItem";

import { postService }
  from "../../services/postService";

/* optional toast */
const toast = (msg) => alert(msg);

export default function ProfileComments({
  postId,
}) {

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    text,
    setText,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    sending,
    setSending,
  ] = useState(false);

  const bottomRef =
    useRef(null);

  const inputRef =
    useRef(null);

  /* =========================
     FETCH COMMENTS
  ========================= */
  useEffect(() => {

    fetchComments();

  }, [postId]);

  const fetchComments =
    async () => {

      try {

        setLoading(true);

        const data =
          await postService.getComments(
            postId
          );

        setComments(data);

      } catch (err) {

        console.log(err);

        toast("Failed to load comments");

      } finally {

        setLoading(false);
      }
    };

  /* =========================
     AUTO SCROLL (SMOOTH)
  ========================= */
  useEffect(() => {

    bottomRef.current
      ?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

  }, [comments]);

  /* =========================
     SUBMIT COMMENT (OPTIMISTIC)
  ========================= */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!text.trim()) return;

      const tempId =
        Date.now();

      const optimistic =
        {
          id: tempId,
          content: text,
          created_at:
            new Date().toISOString(),
          author_detail: {
            username: "You",
            avatar_url: null,
          },
          optimistic: true,
        };

      setComments((prev) => [
        ...prev,
        optimistic,
      ]);

      setText("");
      setSending(true);

      try {

        const newComment =
          await postService.createComment(
            postId,
            {
              content: text,
            }
          );

        setComments((prev) =>
          prev.map((c) =>
            c.id === tempId
              ? newComment
              : c
          )
        );

        toast("Comment posted");

      } catch (err) {

        console.log(err);

        // rollback
        setComments((prev) =>
          prev.filter(
            (c) => c.id !== tempId
          )
        );

        toast("Failed to post comment");

      } finally {

        setSending(false);
      }
    };

  /* =========================
     KEYBOARD UX
  ========================= */
  const handleKeyDown =
    (e) => {

      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {

        e.preventDefault();
        handleSubmit(e);
      }
    };

  return (
    <div
      className="
        flex h-full
        flex-col
      "
    >

      {/* =========================
          COMMENTS LIST
      ========================= */}
      <div
        className="
          flex-1 overflow-y-auto
          px-5 py-4
          scrollbar-thin
        "
      >

        {/* LOADING STATE */}
        {loading && (

          <div
            className="
              space-y-3
            "
          >

            {[...Array(4)].map(
              (_, i) => (

                <div
                  key={i}
                  className="
                    h-16 animate-pulse
                    rounded-2xl
                    bg-white/5
                  "
                />

              )
            )}

          </div>

        )}

        {/* EMPTY STATE */}
        {!loading &&
          comments.length ===
            0 && (

          <div
            className="
              flex h-full
              items-center
              justify-center
            "
          >

            <div
              className="
                text-center
              "
            >

              <p
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                No comments yet
              </p>

              <p
                className="
                  mt-2 text-sm
                  text-slate-500
                "
              >
                Be the first to
                share your thoughts
              </p>

            </div>

          </div>

        )}

        {/* COMMENTS */}
        <AnimatePresence>

          {comments.map(
            (comment) => (

              <motion.div
                key={comment.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <ProfileCommentItem
                  comment={comment}
                  optimistic={
                    comment.optimistic
                  }
                />

              </motion.div>

            )
          )}

        </AnimatePresence>

        <div ref={bottomRef} />

      </div>

      {/* =========================
          INPUT AREA
      ========================= */}
      <form
        onSubmit={handleSubmit}
        className="
          border-t
          border-white/5
          bg-[#0B1220]
          p-4
        "
      >

        <div
          className="
            flex items-end
            gap-3 rounded-2xl
            border border-white/10
            bg-[#0F172A]
            p-3
            focus-within:ring-2
            focus-within:ring-cyan-500/30
          "
        >

          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Write a comment..."
            rows={1}
            className="
              max-h-32 flex-1
              resize-none
              bg-transparent
              px-2 py-2
              text-sm text-white
              outline-none
              placeholder:text-slate-500
            "
          />

          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            disabled={
              sending ||
              !text.trim()
            }
            className="
              flex h-11 w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              to-indigo-500
              text-white
              disabled:opacity-50
            "
          >

            <PaperPlaneTilt
              size={18}
              weight="fill"
            />

          </motion.button>

        </div>

      </form>

    </div>
  );
}
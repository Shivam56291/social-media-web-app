import { PaperPlaneTilt } from "@phosphor-icons/react";

import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProfileCommentItem from "./ProfileCommentItem";

import { postService } from "../../services/postService";

const toast = (msg) => alert(msg);

export default function ProfileComments({ postId }) {
  const [comments, setComments] = useState([]);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);

  const [pagination, setPagination] = useState({
    next: null,
    count: 0,
  });

  const bottomRef = useRef(null);

  /* =========================
     FETCH COMMENTS
  ========================= */
  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const data = await postService.getComments(postId);

      const results = Array.isArray(data)
        ? data
        : data?.results || [];

      setComments(results);

      setPagination({
        next: data?.next || null,
        count: data?.count || results.length,
      });
    } catch (err) {
      console.log(err);
      toast("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOAD MORE (Pagination)
  ========================= */
  const loadMore = async () => {
    if (!pagination.next || loading) return;

    try {
      setLoading(true);

      const res = await fetch(pagination.next);
      const data = await res.json();

      const newComments = data?.results || [];

      setComments((prev) => [...prev, ...newComments]);

      setPagination({
        next: data?.next || null,
        count: data?.count || prev.length,
      });
    } catch (err) {
      console.log(err);
      toast("Failed to load more comments");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [comments]);

  /* =========================
     SUBMIT COMMENT (OPTIMISTIC)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const tempId = Date.now();

    const optimistic = {
      id: tempId,
      content: trimmed,
      created_at: new Date().toISOString(),
      author_detail: {
        username: "You",
        avatar_url: null,
      },
      optimistic: true,
    };

    setComments((prev) => [...prev, optimistic]);

    setText("");
    setSending(true);

    try {
      const newComment = await postService.createComment(
        postId,
        { content: trimmed }
      );

      setComments((prev) =>
        prev.map((c) =>
          c.id === tempId ? newComment : c
        )
      );

      toast("Comment posted");
    } catch (err) {
      console.log(err);

      setComments((prev) =>
        prev.filter((c) => c.id !== tempId)
      );

      toast("Failed to post comment");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* =========================
          COMMENTS LIST
      ========================= */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">

        {/* LOADING */}
        {loading && comments.length === 0 && (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && comments.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-semibold text-white">
                No comments yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Be the first to comment
              </p>
            </div>
          </div>
        )}

        {/* COMMENTS */}
        <AnimatePresence>
          {Array.isArray(comments) &&
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                <ProfileCommentItem
                  comment={comment}
                  optimistic={comment.optimistic}
                />
              </motion.div>
            ))}
        </AnimatePresence>

        <div ref={bottomRef} />

        {/* LOAD MORE */}
        {pagination.next && (
          <button
            onClick={loadMore}
            className="
              w-full mt-2
              rounded-lg
              bg-white/5
              py-2
              text-xs
              text-slate-300
              hover:bg-white/10
            "
          >
            Load more comments
          </button>
        )}
      </div>

      {/* =========================
          INPUT AREA
      ========================= */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/5 bg-[#0B1220] p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-[#0F172A] p-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            rows={1}
            className="
              flex-1 resize-none
              bg-transparent
              px-2 py-2
              text-sm text-white
              outline-none
              placeholder:text-slate-500
            "
          />

          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              bg-gradient-to-br from-cyan-400 to-indigo-500
              text-white
              disabled:opacity-40
            "
          >
            <PaperPlaneTilt size={16} weight="fill" />
          </button>
        </div>
      </form>
    </div>
  );
}
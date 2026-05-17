import {
  Heart,
  ChatCircleDots,
  PaperPlaneTilt,
  BookmarkSimple,
  Trash,
  PencilSimple,
} from "@phosphor-icons/react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { postService } from "../../services/postService";

/* optional: replace with your toast system */
const toast = (msg) => alert(msg);

export default function ProfilePostActions({
  post,
  onEdit,
  onDelete,
  onOpenComments,
}) {

  const [liked, setLiked] = useState(post.is_liked);
  const [count, setCount] = useState(post.likes_count);
  const [saved, setSaved] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  /* =========================
     LIKE (optimistic)
  ========================= */
  const handleLike = async () => {

    const prev = liked;

    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      await postService.toggleLike(post.id);
    } catch (err) {
      setLiked(prev);
      setCount(post.likes_count);
    }
  };

  /* =========================
     SHARE
  ========================= */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`
      );
      toast("Link copied");
    } catch {
      toast("Failed to copy");
    }
  };

  /* =========================
     SAVE (frontend placeholder)
  ========================= */
  const handleSave = () => {
    setSaved((s) => !s);
    toast(saved ? "Removed from saved" : "Saved post");
  };

  /* =========================
     DELETE CONFIRM
  ========================= */
  const handleDelete = async () => {
    try {
      await postService.deletePost(post.id);
      toast("Post deleted");
      setConfirmDelete(false);
      onDelete?.(post.id);
    } catch {
      toast("Failed to delete");
    }
  };

  return (
    <>
      {/* =========================
          ACTION BAR
      ========================= */}
      <div className="mt-6 flex items-center justify-between">

        {/* LEFT ACTIONS */}
        <div className="flex items-center gap-2">

          {/* LIKE */}
          <ActionButton
            active={liked}
            activeClass="text-pink-400 bg-pink-500/10"
            icon={
              <Heart
                size={22}
                weight={liked ? "fill" : "regular"}
              />
            }
            onClick={handleLike}
          />

          {/* COMMENT */}
          <ActionButton
            icon={<ChatCircleDots size={22} />}
            onClick={() => onOpenComments?.()}
          />

          {/* SHARE */}
          <ActionButton
            icon={<PaperPlaneTilt size={22} />}
            onClick={handleShare}
          />

        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">

          {/* SAVE */}
          <ActionButton
            active={saved}
            activeClass="text-cyan-400 bg-cyan-500/10"
            icon={<BookmarkSimple size={22} weight={saved ? "fill" : "regular"} />}
            onClick={handleSave}
          />

          {/* OWNER OPTIONS */}
          <ActionButton
            icon={<PencilSimple size={22} />}
            onClick={onEdit}
          />

          <ActionButton
            danger
            icon={<Trash size={22} />}
            onClick={() => setConfirmDelete(true)}
          />

        </div>

      </div>

      {/* =========================
          DELETE MODAL
      ========================= */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setConfirmDelete(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1220] p-6"
            >
              <h2 className="text-lg font-semibold text-white">
                Delete this post?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-xl px-4 py-2 text-sm text-white/70 hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================
   PREMIUM ACTION BUTTON
========================= */

function ActionButton({
  icon,
  onClick,
  active,
  activeClass = "",
  danger,
}) {

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`
        flex h-12 w-12 items-center
        justify-center rounded-xl
        border border-white/5
        transition-all duration-200

        ${active
          ? activeClass
          : "bg-white/[0.03] text-white hover:bg-white/5"
        }

        ${danger ? "text-red-400 hover:bg-red-500/10" : ""}
      `}
    >
      {icon}
    </motion.button>
  );
}
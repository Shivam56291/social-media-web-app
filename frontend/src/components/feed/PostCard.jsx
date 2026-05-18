import { useEffect, useRef, useState } from "react";

import {
  DotsThree,
  Trash,
  PencilSimple,
  CaretLeft,
  CaretRight,
  X,
} from "@phosphor-icons/react";

import { AnimatePresence, motion } from "framer-motion";

import { formatDistanceToNow } from "date-fns";

import { useDispatch, useSelector } from "react-redux";

import { removePost, restorePost } from "../../features/feed/feedSlice";

import { postService } from "../../services/postService";

import PostActions from "./PostActions";

import EditPostModal from "../post/EditPostModal";
import CommentsPreview from "../comments/CommentsPreview";
import CommentsModal from "../comments/CommentsModal";

export default function PostCard({ post, onShareClick }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const [showMenu, setShowMenu] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  const [showComments, setShowComments] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);

  // States for the Lightbox / Nested Image viewer modal
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const menuRef = useRef(null);

  const user = post.author_detail;

  const images = post.image_urls || [];

  // Extract parent post details using your exact backend key 'parent_post_detail'
  const hasParent = !!post.parent_post_detail;
  const parentPost = post.parent_post_detail;
  const parentAuthor = parentPost?.author_detail;
  const parentImages = parentPost?.image_urls || [];

  /* DELETE */
  const handleDelete = async () => {
    dispatch(removePost(post.id));

    try {
      await postService.deletePost(post.id);
    } catch (error) {
      console.log(error);

      dispatch(restorePost(post));
    }
  };

  /* OUTSIDE CLICK */
  useEffect(() => {
    const handleOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  /* FIX INDEX */
  useEffect(() => {
    if (activeImage > images.length - 1) {
      setActiveImage(0);
    }
  }, [activeImage, images.length]);

  const nextImage = () => {
    if (activeImage < images.length - 1) {
      setActiveImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    }
  };

  // Lightbox handlers for nested photos
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex < parentImages.length - 1) {
      setLightboxIndex((prev) => prev + 1);
    }
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex > 0) {
      setLightboxIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <motion.article
        layout
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -30,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-400/20
          hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center
            justify-between
            p-5
          "
        >
          <div
            className="
              flex items-center gap-4
            "
          >
            {/* AVATAR */}
            <div
              data-tooltip-id="global-tooltip"
              data-tooltip-content={user?.username}
              className="
                flex h-14 w-14
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                font-bold
              "
            >
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="
                    h-full w-full
                    object-cover
                  "
                />
              ) : (
                user?.username?.charAt(0)?.toUpperCase()
              )}
            </div>

            {/* INFO */}
            <div>
              <h3
                className="
                  font-semibold
                "
              >
                {user?.username}
              </h3>

              <p
                className="
                  text-sm text-slate-400
                "
              >
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* MENU */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="
                rounded-xl
                p-2
                transition-all
                hover:bg-white/10
              "
            >
              <DotsThree
                size={24}
                className="
                  text-slate-400
                "
              />
            </button>

            <AnimatePresence>
              {showMenu && post.author === currentUser?.id && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="
                      absolute right-0 top-12
                      z-30
                      w-52
                      overflow-hidden
                      rounded-2xl
                      border border-white/10
                      bg-[#0f172a]/95
                      shadow-2xl
                      backdrop-blur-xl
                    "
                >
                  <button
                    onClick={() => {
                      setOpenEdit(true);

                      setShowMenu(false);
                    }}
                    className="
                        flex w-full
                        items-center gap-3
                        px-4 py-3
                        text-sm
                        text-slate-200
                        transition-all
                        hover:bg-cyan-500/10
                      "
                  >
                    <PencilSimple size={18} />
                    Edit Post
                  </button>

                  <button
                    onClick={handleDelete}
                    className="
                        flex w-full
                        items-center gap-3
                        px-4 py-3
                        text-sm
                        text-red-400
                        transition-all
                        hover:bg-red-500/10
                      "
                  >
                    <Trash size={18} />
                    Delete Post
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CONTENT */}
        {post.content && (
          <div className="px-5 pb-4">
            <p
              className="
                whitespace-pre-wrap
                leading-7
                text-slate-300
              "
            >
              {post.content}
            </p>
          </div>
        )}

        {/* NESTED SHARED/REPOSTED EMBED WITH CLICKABLE IMAGES */}
        {hasParent && parentPost && (
          <div className="px-5 pb-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-200">

              {/* ORIGINAL AUTHOR HEADER */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-[11px] font-bold">
                  {parentAuthor?.avatar_url ? (
                    <img src={parentAuthor.avatar_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    parentAuthor?.username?.charAt(0)?.toUpperCase()
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  {parentAuthor?.username || "user"}
                </span>
                <span className="text-xs text-slate-500">• Original Post</span>
              </div>

              {/* ORIGINAL TEXT CONTENT */}
              {parentPost.content && (
                <p className="text-sm text-slate-300 leading-6 whitespace-pre-wrap mb-2">
                  {parentPost.content}
                </p>
              )}

              {/* ORIGINAL MULTI-IMAGE DYNAMIC GRID SYSTEM */}
              {parentImages.length > 0 && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-white/5 bg-black">
                  {parentImages.length === 1 ? (
                    /* Layout for Single Shared Image */
                    <div
                      onClick={() => openLightbox(0)}
                      className="w-full aspect-video max-h-80 overflow-hidden cursor-pointer group relative"
                    >
                      <img
                        src={parentImages[0]}
                        alt="Shared content"
                        className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    /* Grid Layout for Multiple Shared Images (2, 3, or 4+ images) */
                    <div className="grid grid-cols-2 gap-1.5 aspect-video w-full max-h-80">
                      {parentImages.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => openLightbox(idx)}
                          className={`relative overflow-hidden w-full h-full cursor-pointer group ${parentImages.length === 3 && idx === 0 ? "row-span-2" : ""
                            }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-[1.03]"
                          />

                          {/* More Images Indicator Badge Overlay */}
                          {idx === 3 && parentImages.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
                              <span className="text-sm font-bold text-white">
                                +{parentImages.length - 4} More
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MULTI IMAGE CAROUSEL (For original timeline posts) */}
        {images.length > 0 && (
          <div className="px-3 pb-3">
            {/* MAIN IMAGE */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-black
              "
            >
              <div
                className="
                  relative
                  h-[420px]
                  w-full
                  md:h-[520px]
                "
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt="post"
                    loading="lazy"
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -40,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      absolute inset-0
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </AnimatePresence>

                {/* COUNT */}
                {images.length > 1 && (
                  <div
                    className="
                      absolute right-4 top-4
                      rounded-full
                      bg-black/50
                      px-3 py-1
                      text-xs
                      backdrop-blur-xl
                    "
                  >
                    {activeImage + 1}/{images.length}
                  </div>
                )}

                {/* LEFT */}
                {activeImage > 0 && (
                  <button
                    onClick={prevImage}
                    className="
                      absolute left-4 top-1/2
                      flex h-11 w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-black/40
                      backdrop-blur-xl
                    "
                  >
                    <CaretLeft size={22} />
                  </button>
                )}

                {/* RIGHT */}
                {activeImage < images.length - 1 && (
                  <button
                    onClick={nextImage}
                    className="
                      absolute right-4 top-1/2
                      flex h-11 w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-black/40
                      backdrop-blur-xl
                    "
                  >
                    <CaretRight size={22} />
                  </button>
                )}
              </div>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div
                className="
                  mt-3 flex
                  gap-2
                  overflow-x-auto
                  pb-1
                "
              >
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`
                        relative
                        h-16
                        w-16
                        shrink-0
                        overflow-hidden
                        rounded-2xl
                        border
                        transition-all
                        ${activeImage === index
                        ? "border-cyan-400"
                        : "border-white/10"
                      }
                      `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                          h-full
                          w-full
                          object-cover
                        "
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIONS BUTTONS ROW */}
        <div className="px-5 pb-5">
          <PostActions
            post={post}
            onShareClick={onShareClick}
            onCommentClick={() =>
              setShowComments(
                (prev) => !prev
              )
            }
          />
        </div>
      </motion.article>
      <AnimatePresence>

        {showComments && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden"
          >

            <CommentsPreview
              post={post}
              onOpenModal={() =>
                setCommentsModalOpen(true)
              }
            />

          </motion.div>

        )}

      </AnimatePresence>

      {/* EDIT POST DIALOG MODAL */}
      <EditPostModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        post={post}
      />

      <CommentsModal
        open={commentsModalOpen}
        onClose={() =>
          setCommentsModalOpen(false)
        }
        post={post}
      />

      {/* FULL-SCREEN INTERACTIVE LIGHTBOX FOR NESTED SHARED POST IMAGES */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
            >
              <X size={24} />
            </button>

            {/* Main Lightbox Frame Container */}
            <div className="relative w-full max-w-5xl aspect-video max-h-[85vh] overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 flex items-center justify-center">
              <img
                src={parentImages[lightboxIndex]}
                alt=""
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()} // Prevent close on clicking image itself
              />

              {/* Index counter text badge */}
              {parentImages.length > 1 && (
                <div className="absolute top-6 left-6 rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-xl">
                  {lightboxIndex + 1} / {parentImages.length}
                </div>
              )}

              {/* Left Arrow Navigation */}
              {lightboxIndex > 0 && (
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl hover:bg-white/10 transition-all"
                >
                  <CaretLeft size={28} />
                </button>
              )}

              {/* Right Arrow Navigation */}
              {lightboxIndex < parentImages.length - 1 && (
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl hover:bg-white/10 transition-all"
                >
                  <CaretRight size={28} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
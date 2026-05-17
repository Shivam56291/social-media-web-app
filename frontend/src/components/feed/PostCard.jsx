import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  DotsThree,
  Trash,
  PencilSimple,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  formatDistanceToNow,
} from "date-fns";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  removePost,
  restorePost,
} from "../../features/feed/feedSlice";

import { postService }
  from "../../services/postService";

import PostActions
  from "./PostActions";

import EditPostModal
  from "../post/EditPostModal";

export default function PostCard({
  post,
}) {

  const dispatch =
    useDispatch();

  const currentUser =
    useSelector(
      (state) =>
        state.auth.user
    );

  const [
    showMenu,
    setShowMenu,
  ] = useState(false);

  const [
    openEdit,
    setOpenEdit,
  ] = useState(false);

  const [
    activeImage,
    setActiveImage,
  ] = useState(0);

  const menuRef =
    useRef(null);

  const user =
    post.author_detail;

  const images =
    post.image_urls || [];

  /* DELETE */
  const handleDelete =
    async () => {

      dispatch(
        removePost(post.id)
      );

      try {

        await postService.deletePost(
          post.id
        );

      } catch (error) {

        dispatch(
          restorePost(post)
        );
      }
    };

  /* OUTSIDE CLICK */
  useEffect(() => {

    const handleOutside = (
      event
    ) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {

        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };

  }, []);

  /* FIX IMAGE INDEX */
  useEffect(() => {

    if (
      activeImage >
      images.length - 1
    ) {

      setActiveImage(0);
    }

  }, [
    activeImage,
    images.length,
  ]);

  const nextImage = () => {

    if (
      activeImage <
      images.length - 1
    ) {

      setActiveImage(
        (prev) => prev + 1
      );
    }
  };

  const prevImage = () => {

    if (activeImage > 0) {

      setActiveImage(
        (prev) => prev - 1
      );
    }
  };

  return (
    <>
      <motion.article
        layout
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-[#0F172A]
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center
            justify-between
            px-4 py-3
          "
        >

          <div
            className="
              flex items-center
              gap-3
            "
          >

            {/* AVATAR */}
            <div
              className="
                h-11 w-11
                overflow-hidden
                rounded-full
                bg-[#1E293B]
                ring-1 ring-white/10
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

                <div
                  className="
                    flex h-full
                    w-full items-center
                    justify-center
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {user?.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

              )}

            </div>

            {/* INFO */}
            <div>

              <h3
                className="
                  text-[15px]
                  font-medium
                  text-white
                "
              >
                {user?.username}
              </h3>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                {formatDistanceToNow(
                  new Date(
                    post.created_at
                  ),
                  {
                    addSuffix: true,
                  }
                )}
              </p>

            </div>

          </div>

          {/* MENU */}
          <div
            ref={menuRef}
            className="relative"
          >

            <button
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
              className="
                rounded-full
                p-1.5
                transition-all
                hover:bg-white/10
              "
            >

              <DotsThree
                size={20}
                className="
                  text-slate-400
                "
              />

            </button>

            <AnimatePresence>

              {showMenu &&
                post.author ===
                currentUser?.id && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                    }}
                    className="
                      absolute right-0 top-10
                      z-30
                      w-44
                      overflow-hidden
                      rounded-xl
                      border border-white/10
                      bg-[#111827]
                    "
                  >

                    <button
                      onClick={() => {

                        setOpenEdit(
                          true
                        );

                        setShowMenu(
                          false
                        );
                      }}
                      className="
                        flex w-full
                        items-center gap-2
                        px-4 py-3
                        text-sm
                        text-slate-200
                        hover:bg-white/5
                      "
                    >

                      <PencilSimple
                        size={16}
                      />

                      Edit Post

                    </button>

                    <button
                      onClick={
                        handleDelete
                      }
                      className="
                        flex w-full
                        items-center gap-2
                        px-4 py-3
                        text-sm
                        text-red-400
                        hover:bg-red-500/10
                      "
                    >

                      <Trash
                        size={16}
                      />

                      Delete Post

                    </button>

                  </motion.div>

                )}

            </AnimatePresence>

          </div>

        </div>

        {/* CONTENT */}
        {post.content && (

          <div className="px-4 pb-3">

            <p
              className="
                whitespace-pre-wrap
                text-[15px]
                leading-7
                text-slate-300
              "
            >
              {post.content}
            </p>

          </div>

        )}

        {/* IMAGES */}
        {images.length > 0 && (

          <div className="px-3">

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                bg-black
              "
            >

              <div
                className="
                  relative
                  h-[360px]
                  w-full
                  md:h-[460px]
                "
              >

                <AnimatePresence
                  mode="wait"
                >

                  <motion.img
                    key={
                      images[
                        activeImage
                      ]
                    }
                    src={
                      images[
                        activeImage
                      ]
                    }
                    alt="post"
                    loading="lazy"
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.2,
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
                      absolute right-3 top-3
                      rounded-full
                      bg-black/50
                      px-2.5 py-1
                      text-[11px]
                      text-white
                      backdrop-blur-xl
                    "
                  >
                    {activeImage + 1}
                    /
                    {images.length}
                  </div>

                )}

                {/* LEFT */}
                {activeImage > 0 && (

                  <button
                    onClick={
                      prevImage
                    }
                    className="
                      absolute left-3 top-1/2
                      flex h-9 w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-black/40
                      backdrop-blur-xl
                    "
                  >

                    <CaretLeft
                      size={18}
                    />

                  </button>

                )}

                {/* RIGHT */}
                {activeImage <
                  images.length -
                    1 && (

                  <button
                    onClick={
                      nextImage
                    }
                    className="
                      absolute right-3 top-1/2
                      flex h-9 w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-black/40
                      backdrop-blur-xl
                    "
                  >

                    <CaretRight
                      size={18}
                    />

                  </button>

                )}

              </div>

            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (

              <div
                className="
                  mt-2 flex
                  gap-2
                  overflow-x-auto
                  pb-1
                "
              >

                {images.map(
                  (
                    image,
                    index
                  ) => (

                    <button
                      key={image}
                      onClick={() =>
                        setActiveImage(
                          index
                        )
                      }
                      className={`
                        h-14
                        w-14
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        ${
                          activeImage ===
                          index
                            ? "border-white"
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

                  )
                )}

              </div>

            )}

          </div>

        )}

        {/* ACTIONS */}
        <div className="px-4 py-3">

          <PostActions
            post={post}
          />

        </div>

      </motion.article>

      {/* EDIT MODAL */}
      <EditPostModal
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        post={post}
      />
    </>
  );
}
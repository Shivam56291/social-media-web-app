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

        console.log(error);

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

  /* FIX INDEX */
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
              data-tooltip-content={
                user?.username
              }
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

                user?.username
                  ?.charAt(0)
                  ?.toUpperCase()

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

              {showMenu &&
                post.author ===
                currentUser?.id && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
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

                        setOpenEdit(
                          true
                        );

                        setShowMenu(
                          false
                        );
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

                      <PencilSimple
                        size={18}
                      />

                      Edit Post

                    </button>

                    <button
                      onClick={
                        handleDelete
                      }
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

                      <Trash
                        size={18}
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

        {/* MULTI IMAGE */}
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
                    {activeImage + 1}
                    /
                    {
                      images.length
                    }
                  </div>

                )}

                {/* LEFT */}
                {activeImage > 0 && (

                  <button
                    onClick={
                      prevImage
                    }
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

                    <CaretLeft
                      size={22}
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

                    <CaretRight
                      size={22}
                    />

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
                        relative
                        h-16
                        w-16
                        shrink-0
                        overflow-hidden
                        rounded-2xl
                        border
                        transition-all
                        ${
                          activeImage ===
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
        <div className="px-5 pb-5">

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
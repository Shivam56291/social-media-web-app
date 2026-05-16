import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  DotsThree,
  Trash,
  PencilSimple,
} from "@phosphor-icons/react";

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

  const menuRef = useRef(null);

  const user =
    post.author_detail;

  /* DELETE */
  const handleDelete =
    async () => {

      // instant remove
      dispatch(
        removePost(post.id)
      );

      try {

        await postService.deletePost(
          post.id
        );

      } catch (error) {

        console.log(error);

        // rollback
        dispatch(
          restorePost(post)
        );
      }
    };

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

  return (
    <>
      <article
        className="
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
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
                  new Date(post.created_at),
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

            {/* DROPDOWN */}
            {showMenu &&
              post.author ===
              currentUser?.id && (

                <div
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
                    animate-in
                    fade-in
                    slide-in-from-top-2
                    zoom-in-95
                    duration-200
                  "
                >

                  {/* EDIT */}
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

                    <PencilSimple
                      size={18}
                    />

                    Edit Post

                  </button>

                  {/* DELETE */}
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

                </div>

              )}

          </div>

        </div>

        {/* IMAGE */}
        {/* IMAGE */}
        {post.image_urls?.length > 0 && (

          <div className="overflow-hidden">

            <img
              src={post.image_urls[0]}
              loading="lazy"
              alt="post"
              className="
        max-h-[520px]
        min-h-[300px]
        w-full
        object-cover
        transition-all
        duration-700
        hover:scale-[1.03]
              "
            />

          </div>

        )}

        {/* CONTENT */}
        <div className="p-5">

          <PostActions
            post={post}
          />

          {post.content && (

            <p
              className="
                mt-4
                whitespace-pre-wrap
                leading-7
                text-slate-300
              "
            >
              {post.content}
            </p>

          )}

        </div>

      </article>

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
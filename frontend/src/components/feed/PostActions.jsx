import {
  Heart,
  ChatCircleDots,
  Share,
} from "@phosphor-icons/react";

import {
  useState,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  toggleLikeOptimistic,
} from "../../features/feed/feedSlice";

import { postService }
  from "../../services/postService";

export default function PostActions({
  post,
}) {

  const dispatch =
    useDispatch();

  const [
    liking,
    setLiking,
  ] = useState(false);

  /* LIKE */
  const handleLike =
    async () => {

      // prevent spam clicks
      if (liking) return;

      setLiking(true);

      // optimistic UI
      dispatch(
        toggleLikeOptimistic(
          post.id
        )
      );

      try {

        await postService.toggleLike(
          post.id
        );

      } catch (error) {

        console.log(error);

        // rollback
        dispatch(
          toggleLikeOptimistic(
            post.id
          )
        );

      } finally {

        setLiking(false);
      }
    };

  return (
    <div
      className="
        mb-4 flex
        items-center gap-6
      "
    >

      {/* LIKE */}
      <button
        onClick={handleLike}
        className="
          flex items-center
          gap-2
          rounded-xl
          px-2 py-1
          transition-all
          duration-200
          hover:bg-pink-500/10
          hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]
          active:scale-95
        "
      >

        <Heart
          size={24}
          weight={
            post.is_liked
              ? "fill"
              : "regular"
          }
          className={`
            transition-all
            duration-300
            hover:scale-110
            active:scale-125
            ${
              post.is_liked
                ? "scale-110 text-pink-400"
                : "text-slate-300"
            }
          `}
        />

        <span
          className="
            text-sm
            text-slate-300
          "
        >
          {post.likes_count}
        </span>

      </button>

      {/* COMMENTS */}
      <button
        className="
          flex items-center
          gap-2
          rounded-xl
          px-2 py-1
          transition-all
          duration-200
          hover:bg-cyan-500/10
          hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
          active:scale-95
        "
      >

        <ChatCircleDots
          size={24}
          className="
            text-slate-300
            transition-all
            duration-200
            hover:text-cyan-400
            hover:scale-110
          "
        />

        <span
          className="
            text-sm
            text-slate-300
          "
        >
          {post.comments_count}
        </span>

      </button>

      {/* SHARE */}
      <button
        className="
          rounded-xl
          p-2
          transition-all
          duration-200
          hover:bg-indigo-500/10
          hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]
          active:scale-95
        "
      >

        <Share
          size={24}
          className="
            text-slate-300
            transition-all
            duration-200
            hover:text-indigo-400
            hover:scale-110
          "
        />

      </button>

    </div>
  );
}
import {
  useEffect,
  useState,
} from "react";

import {
  X,
  SpinnerGap,
} from "@phosphor-icons/react";

import {
  useDispatch,
} from "react-redux";

import {
  updatePost,
} from "../../features/feed/feedSlice";

import { postService }
  from "../../services/postService";

export default function EditPostModal({
  open,
  onClose,
  post,
}) {

  const dispatch =
    useDispatch();

  const [
    content,
    setContent,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {

    if (post) {

      setContent(
        post.content || ""
      );
    }

  }, [post]);

  if (!open) return null;

  const handleUpdate =
  async () => {

    // prevent useless request
    if (
      content.trim() ===
      post.content?.trim()
    ) {

      onClose();

      return;
    }

    const oldPost = post;

    const optimisticPost = {
      ...post,
      content,
    };

    // instant UI update
    dispatch(
      updatePost(
        optimisticPost
      )
    );

    // close immediately
    onClose();

    try {

      setLoading(true);

      const updatedPost =
        await postService.updatePost(
          post.id,
          {
            content,
          }
        );

      // sync backend response
      dispatch(
        updatePost(
          updatedPost
        )
      );

    } catch (error) {

      console.log(error);

      // rollback
      dispatch(
        updatePost(oldPost)
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="
    fixed inset-0 z-50
    flex items-center
    justify-center
    bg-black/60
    backdrop-blur-sm
    animate-in fade-in
  "
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full max-w-xl
          rounded-3xl
          border border-white/10
          bg-[#0f172a]
          p-6
          shadow-2xl
          animate-in zoom-in-95
        "
      >

        {/* HEADER */}
        <div
          className="
            mb-5 flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Edit Post
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition-all
              hover:bg-white/10
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* TEXTAREA */}
        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          placeholder="Update your thoughts..."
          className="
            min-h-[180px]
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-5
            text-slate-200
            outline-none
            transition-all
            focus:border-cyan-400/40
          "
        />

        {/* ACTIONS */}
        <div
          className="
            mt-5 flex
            justify-end
          "
        >

          <button
            onClick={handleUpdate}
            disabled={
              loading ||
              !content.trim()
            }
            className="
              flex items-center
              gap-2
              rounded-2xl
              bg-cyan-500
              px-6 py-3
              font-medium
              text-black
              transition-all
              hover:scale-105
              hover:bg-cyan-400
              disabled:opacity-50
            "
          >

            {loading && (
              <SpinnerGap
                size={18}
                className="
                  animate-spin
                "
              />
            )}

            Save Changes

          </button>

        </div>

      </div>

    </div>
  );
}
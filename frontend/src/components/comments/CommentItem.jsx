import { formatDistanceToNow }
  from "date-fns";

export default function CommentItem({
  comment,
  compact = false,
}) {

  const user =
    comment.author_detail;

  if (compact) {

    return (
      <div className="flex gap-2 text-sm">

        <span
          className="
            font-semibold
            text-white
          "
        >
          {user?.username}
        </span>

        <p
          className="
            text-slate-300
            break-words
          "
        >
          {comment.content}
        </p>

      </div>
    );
  }

  return (
    <div className="flex gap-3">

      <img
        src={user?.avatar_url}
        alt=""
        className="
          h-9 w-9
          rounded-full
          object-cover
        "
      />

      <div className="flex-1">

        <div
          className="
            rounded-2xl
            bg-white/[0.04]
            px-4 py-3
          "
        >

          <p
            className="
              text-sm
              font-semibold
            "
          >
            {user?.username}
          </p>

          <p
            className="
              mt-1
              text-sm
              text-slate-300
              whitespace-pre-wrap
            "
          >
            {comment.content}
          </p>

        </div>

        <div
          className="
            mt-1
            flex items-center
            gap-4
            pl-2
          "
        >

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {formatDistanceToNow(
              new Date(comment.created_at),
              { addSuffix: true }
            )}
          </span>

          <button
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Like
          </button>

          <button
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Reply
          </button>

        </div>

      </div>

    </div>
  );
}
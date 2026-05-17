import {
  useState,
} from "react";

import ProfilePostCard
  from "./ProfilePostCard";

import ProfilePostModal
  from "./ProfilePostModal";

export default function ProfilePostsGrid({
  posts,
}) {

  const [
    selectedPost,
    setSelectedPost,
  ] = useState(null);

  if (!posts.length) {

    return (
      <div
        className="
          flex h-[320px]
          items-center
          justify-center
          rounded-[35px]
          border border-dashed
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
        "
      >

        <div className="text-center">

          <h3
            className="
              text-3xl
              font-black
              text-white
            "
          >
            No Posts Yet
          </h3>

          <p
            className="
              mt-3 text-slate-400
            "
          >
            Share your first moment ✨
          </p>

        </div>

      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >

        {posts.map((post) => (

          <ProfilePostCard
            key={post.id}
            post={post}
            onClick={() =>
              setSelectedPost(post)
            }
          />

        ))}

      </div>

      <ProfilePostModal
        post={selectedPost}
        open={!!selectedPost}
        onClose={() =>
          setSelectedPost(null)
        }
      />
    </>
  );
}
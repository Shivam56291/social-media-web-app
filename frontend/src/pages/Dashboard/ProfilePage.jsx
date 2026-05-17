import {
  useEffect,
  useState,
} from "react";

import {
  useSelector,
} from "react-redux";

import EditProfileModal
  from "../../components/profile/EditProfileModal";

import ProfileHeader
  from "../../components/profile/ProfileHeader";

import ProfilePostsGrid
  from "../../components/profile/ProfilePostsGrid";

import ProfilePostsSkeleton
  from "../../components/profile/ProfilePostsSkeleton";

import { postService }
  from "../../services/postService";

export default function ProfilePage() {

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    posts,
    setPosts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* FETCH POSTS */
  useEffect(() => {

    const fetchPosts =
      async () => {

        try {

          const data =
            await postService.getUserPosts(
              user.id
            );

          setPosts(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    if (user?.id) {

      fetchPosts();
    }

  }, [user]);

  return (
    <div
      className="
        min-h-screen
        pb-20
      "
    >

      {/* HEADER */}
      <ProfileHeader
        user={user}
        postsCount={posts.length}
        onEdit={() =>
          setEditOpen(true)
        }
      />

      {/* POSTS */}
      <div className="mt-10">

        <div
          className="
            mb-7 flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Your Posts
            </h2>

            <p
              className="
                mt-1 text-sm
                text-slate-400
              "
            >
              Showcase your latest
              memories, thoughts &
              creations.
            </p>

          </div>

          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              px-5 py-3
              text-sm
              text-slate-300
              backdrop-blur-xl
            "
          >
            {posts.length} Posts
          </div>

        </div>

        {loading ? (

          <ProfilePostsSkeleton />

        ) : (

          <ProfilePostsGrid
            posts={posts}
          />

        )}

      </div>

      {/* MODAL */}
      <EditProfileModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        user={user}
      />

    </div>
  );
}
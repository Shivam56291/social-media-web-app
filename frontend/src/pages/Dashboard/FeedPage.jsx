import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { Tooltip }
  from "react-tooltip";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setPosts,
  setLoading,
} from "../../features/feed/feedSlice";

import FeedTopbar
  from "../../components/feed/FeedTopbar";

import StoriesBar
  from "../../components/feed/StoriesBar";

import PostCard
  from "../../components/feed/PostCard";

import PostSkeleton
  from "../../components/feed/PostSkeleton";

import RightSidebar
  from "../../components/feed/RightSidebar";

import CreatePostModal
  from "../../components/post/CreatePostModal";

import { postService }
  from "../../services/postService";

export default function FeedPage() {

  const dispatch =
    useDispatch();

  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  const {
    posts,
    loading,
  } = useSelector(
    (state) =>
      state.feed
  );

  // States for creating a regular new post
  const [
    openModal,
    setOpenModal,
  ] = useState(false);

  // ADDED: States for sharing/reposting an existing post 
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activePostToShare, setActivePostToShare] = useState(null);

  /* FETCH POSTS */
  useEffect(() => {

    const fetchFeed =
      async () => {

        try {

          dispatch(
            setLoading(true)
          );

          const data =
            await postService.getFeed();

          dispatch(
            setPosts(data)
          );

        } catch (error) {

          console.log(error);

        } finally {

          dispatch(
            setLoading(false)
          );
        }
      };

    fetchFeed();

  }, [dispatch]);

  // ADDED: Share triggers
  const handleOpenShareModal = (post) => {
    setActivePostToShare(post);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setActivePostToShare(null);
  };

  return (
    <>
      {/* TOPBAR */}
      <FeedTopbar
        onOpenModal={() =>
          setOpenModal(true)
        }
      />

      {/* STORIES */}
      <StoriesBar />

      {/* FEED */}
      <div
        className="
          grid gap-8
          xl:grid-cols-[1fr_320px]
        "
      >

        {/* POSTS */}
        <div className="space-y-6">

          {loading ? (

            Array.from({
              length: 3,
            }).map((_, i) => (

              <PostSkeleton
                key={i}
              />

            ))

          ) : posts.length > 0 ? (

            <AnimatePresence
              mode="popLayout"
            >

              {posts.map(
                (
                  post,
                  index
                ) => (

                  <motion.div
                    key={post.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -40,
                    }}
                    transition={{
                      duration: 0.35,
                      delay:
                        index *
                        0.04,
                    }}
                  >

                    {/* UPDATED: Forward the click event down into PostCard */}
                    <PostCard
                      post={post}
                      onShareClick={handleOpenShareModal}
                    />

                  </motion.div>

                )
              )}

            </AnimatePresence>

          ) : (

            <div
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                p-10
                text-center
                text-slate-400
              "
            >
              No posts yet ✨
            </div>

          )}

        </div>

        {/* SIDEBAR */}
        <RightSidebar />

      </div>

      {/* CREATE POST MODAL (For standard brand new posts) */}
      <CreatePostModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        user={user}
      />

      {/* ADDED: SHARE POST MODAL (For quote sharing/reposting existing records) */}
      <CreatePostModal
        open={isShareModalOpen}
        onClose={handleCloseShareModal}
        user={user}
        sharePostData={activePostToShare}
      />

      {/* TOOLTIP */}
      <Tooltip
        id="global-tooltip"
        place="bottom"
        className="
          !rounded-xl
          !bg-[#111827]
          !text-white
          !px-3
          !py-2
          !text-sm
          !shadow-xl
          !z-50
          !backdrop-blur-xl
        "
      />
    </>
  );
}
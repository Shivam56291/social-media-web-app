import { useEffect, useState } from "react";

import { Tooltip } from "react-tooltip";

import { useSelector } from "react-redux";

import FeedTopbar from "../../components/feed/FeedTopbar";
import StoriesBar from "../../components/feed/StoriesBar";
import PostCard from "../../components/feed/PostCard";
import PostSkeleton from "../../components/feed/PostSkeleton";
import RightSidebar from "../../components/feed/RightSidebar";

import CreatePostModal from "../../components/post/CreatePostModal";

import { POSTS } from "../../constants/feedData";

export default function FeedPage() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const [openModal, setOpenModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

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
          {loading
            ? Array.from({
                length: 3,
              }).map((_, i) => (
                <PostSkeleton key={i} />
              ))
            : POSTS.map((post) => (
                <PostCard
                  key={post}
                  user={user}
                />
              ))}
        </div>

        {/* SIDEBAR */}
        <RightSidebar />
      </div>

      {/* CREATE POST MODAL */}
      <CreatePostModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        user={user}
      />

      {/* GLOBAL TOOLTIP */}
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
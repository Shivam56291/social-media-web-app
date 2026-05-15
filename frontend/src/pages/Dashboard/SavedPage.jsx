import { useEffect, useState } from "react";

import {
  BookmarkSimple,
  Heart,
  DotsThree,
  ShareNetwork,
  PlayCircle,
  MagnifyingGlass,
  GridFour,
  Rows,
  ClockCounterClockwise,
  FolderSimple,
  Sparkle,
  Trash,
  ArrowUpRight,
} from "@phosphor-icons/react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FILTERS = [
  "All",
  "Design",
  "Technology",
  "AI",
  "Startups",
  "Inspiration",
];

const SAVED_POSTS = [
  {
    id: 1,
    category: "Technology",
    title:
      "Building premium social media platforms with React and TailwindCSS",
    likes: "12.4k",
    savedAt: "Saved 2 hours ago",
  },
  {
    id: 2,
    category: "Design",
    title:
      "Modern glassmorphism dashboard trends for next-gen applications",
    likes: "8.9k",
    savedAt: "Saved yesterday",
  },
  {
    id: 3,
    category: "AI",
    title:
      "AI-powered startup ideas that are transforming digital products",
    likes: "18.1k",
    savedAt: "Saved 3 days ago",
  },
];

export default function SavedPage() {
  const [loading, setLoading] =
    useState(true);

  const [gridView, setGridView] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div
        className="
          mb-8 flex
          flex-col gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* TITLE */}
        <div>
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-16 w-16
                items-center justify-center
                rounded-[28px]
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                shadow-2xl
                shadow-indigo-500/20
              "
            >
              <BookmarkSimple
                size={30}
                weight="fill"
              />
            </div>

            <div>
              <h1
                className="
                  text-4xl
                  font-black
                  tracking-tight
                "
              >
                Saved
              </h1>

              <p
                className="
                  mt-1 text-slate-400
                "
              >
                Your saved posts,
                inspirations, and collections
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="Grid View"
            onClick={() =>
              setGridView(true)
            }
            className={`
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-white/10
              transition-all duration-300
              ${
                gridView
                  ? `
                    bg-white
                    text-black
                  `
                  : `
                    bg-white/[0.04]
                    text-slate-300
                    hover:bg-white/[0.08]
                  `
              }
            `}
          >
            <GridFour size={20} />
          </button>

          <button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="List View"
            onClick={() =>
              setGridView(false)
            }
            className={`
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-white/10
              transition-all duration-300
              ${
                !gridView
                  ? `
                    bg-white
                    text-black
                  `
                  : `
                    bg-white/[0.04]
                    text-slate-300
                    hover:bg-white/[0.08]
                  `
              }
            `}
          >
            <Rows size={20} />
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className="
          mb-8 flex
          items-center gap-4
          rounded-3xl
          border border-white/10
          bg-white/[0.04]
          px-6 py-5
          backdrop-blur-xl
        "
      >
        <MagnifyingGlass
          size={22}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search saved posts..."
          className="
            w-full bg-transparent
            text-sm outline-none
            placeholder:text-slate-500
          "
        />
      </div>

      {/* FILTERS */}
      <div
        className="
          mb-8 flex
          gap-3 overflow-x-auto
          pb-2
          scrollbar-hide
        "
      >
        {FILTERS.map(
          (filter, index) => (
            <button
              key={filter}
              data-tooltip-id="global-tooltip"
              data-tooltip-content={`Filter ${filter}`}
              className={`
                whitespace-nowrap
                rounded-2xl
                px-5 py-3
                text-sm font-medium
                transition-all duration-300
                ${
                  index === 0
                    ? `
                      bg-white
                      text-black
                    `
                    : `
                      border border-white/10
                      bg-white/[0.04]
                      text-slate-300
                      hover:bg-white/[0.08]
                    `
                }
              `}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      <div
        className="
          grid gap-8
          xl:grid-cols-[1fr_340px]
        "
      >
        {/* POSTS */}
        <div
          className={
            gridView
              ? `
                grid gap-6
                md:grid-cols-2
              `
              : "space-y-6"
          }
        >
          {loading ? (
            <>
              <SavedSkeleton />
              <SavedSkeleton />
              <SavedSkeleton />
              <SavedSkeleton />
            </>
          ) : (
            SAVED_POSTS.map((post) => (
              <SavedCard
                key={post.id}
                post={post}
                listView={!gridView}
              />
            ))
          )}
        </div>

        {/* RIGHT PANEL */}
        <aside className="hidden xl:block">
          <div
            className="
              sticky top-6
              space-y-6
            "
          >
            {/* COLLECTIONS */}
            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  border-b border-white/10
                  p-6
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-cyan-500
                    "
                  >
                    <FolderSimple
                      size={22}
                      weight="fill"
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-xl
                        font-black
                      "
                    >
                      Collections
                    </h3>

                    <p className="text-sm text-slate-400">
                      Organize your saves
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <CollectionItem
                  name="UI Inspiration"
                  posts="128 posts"
                />

                <CollectionItem
                  name="React Ideas"
                  posts="82 posts"
                />

                <CollectionItem
                  name="Startup Research"
                  posts="54 posts"
                />

                <CollectionItem
                  name="AI Products"
                  posts="39 posts"
                />
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-orange-500
                    to-pink-500
                  "
                >
                  <ClockCounterClockwise
                    size={22}
                    weight="fill"
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      font-black
                    "
                  >
                    Activity
                  </h3>

                  <p className="text-sm text-slate-400">
                    Recent saves
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <ActivityItem text="Saved 14 new posts today" />

                <ActivityItem text="Created new collection" />

                <ActivityItem text="Shared 2 saved posts" />
              </div>
            </div>

            {/* INSIGHTS */}
            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-gradient-to-br
                from-indigo-500/10
                via-cyan-500/5
                to-transparent
                p-6
              "
            >
              <div
                className="
                  mb-5 flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-500
                  to-cyan-500
                "
              >
                <Sparkle
                  size={24}
                  weight="fill"
                />
              </div>

              <h3
                className="
                  text-2xl
                  font-black
                "
              >
                Smart Collections
              </h3>

              <p
                className="
                  mt-3 leading-7
                  text-slate-400
                "
              >
                AI-powered saved post
                organization and personalized
                collections coming soon.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* TOOLTIP */}
      <Tooltip
        id="global-tooltip"
        place="bottom"
        className="
          !rounded-xl
          !bg-[#111827]
          !px-3
          !py-2
          !text-sm
          !text-white
          !shadow-2xl
          !z-50
        "
      />
    </>
  );
}

/* SAVED CARD */

function SavedCard({
  post,
  listView,
}) {
  return (
    <div
      className={`
        group overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/20
        ${
          listView
            ? `
              flex gap-6
            `
            : ""
        }
      `}
    >
      {/* IMAGE */}
      <div
        className={`
          relative overflow-hidden
          bg-gradient-to-br
          from-indigo-500/30
          via-cyan-500/20
          to-pink-500/20
          ${
            listView
              ? `
                h-[240px]
                w-[320px]
                shrink-0
              `
              : "h-[260px]"
          }
        `}
      >
        {/* CATEGORY */}
        <div
          className="
            absolute left-5 top-5
            rounded-2xl
            border border-white/10
            bg-black/30
            px-4 py-2
            backdrop-blur-xl
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-cyan-300
            "
          >
            {post.category}
          </p>
        </div>

        {/* PLAY */}
        <button
          data-tooltip-id="global-tooltip"
          data-tooltip-content="Open Saved Post"
          className="
            absolute inset-0
            flex items-center
            justify-center
          "
        >
          <div
            className="
              flex h-20 w-20
              items-center justify-center
              rounded-full
              bg-white/10
              backdrop-blur-xl
              transition-all duration-300
              group-hover:scale-110
            "
          >
            <PlayCircle
              size={42}
              weight="fill"
            />
          </div>
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">
        {/* TOP */}
        <div
          className="
            mb-5 flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                font-bold
              "
            >
              C
            </div>

            <div>
              <h3 className="font-semibold">
                ConnectSphere
              </h3>

              <p
                className="
                  text-sm text-slate-400
                "
              >
                {post.savedAt}
              </p>
            </div>
          </div>

          <button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="More Options"
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              transition-all duration-300
              hover:bg-white/[0.08]
            "
          >
            <DotsThree size={20} />
          </button>
        </div>

        {/* TITLE */}
        <h2
          className="
            text-2xl
            font-black
            leading-tight
          "
        >
          {post.title}
        </h2>

        {/* STATS */}
        <div
          className="
            mt-auto flex
            items-center
            justify-between
            pt-6
          "
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Heart
                size={20}
                weight="fill"
                className="text-pink-400"
              />

              <span className="text-sm">
                {post.likes}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BookmarkSimple
                size={20}
                weight="fill"
                className="text-cyan-400"
              />

              <span className="text-sm">
                Saved
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              data-tooltip-id="global-tooltip"
              data-tooltip-content="Share Saved Post"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                transition-all duration-300
                hover:bg-white/[0.08]
              "
            >
              <ShareNetwork
                size={20}
              />
            </button>

            <button
              data-tooltip-id="global-tooltip"
              data-tooltip-content="Remove from Saved"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                border border-red-500/10
                bg-red-500/10
                text-red-300
                transition-all duration-300
                hover:bg-red-500/20
              "
            >
              <Trash size={20} />
            </button>

            <button
              data-tooltip-id="global-tooltip"
              data-tooltip-content="Open Post"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                shadow-xl
                shadow-indigo-500/20
                transition-all duration-300
                hover:scale-105
              "
            >
              <ArrowUpRight
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COLLECTION ITEM */

function CollectionItem({
  name,
  posts,
}) {
  return (
    <div
      className="
        flex items-center
        justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500/20
            to-cyan-500/20
          "
        >
          <FolderSimple
            size={24}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h3 className="font-semibold">
            {name}
          </h3>

          <p
            className="
              text-sm text-slate-400
            "
          >
            {posts}
          </p>
        </div>
      </div>

      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content={`Open ${name}`}
        className="
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-2
          text-sm
          transition-all duration-300
          hover:bg-white/[0.08]
        "
      >
        View
      </button>
    </div>
  );
}

/* ACTIVITY */

function ActivityItem({
  text,
}) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        px-4 py-4
      "
    >
      <div
        className="
          h-2.5 w-2.5
          rounded-full
          bg-cyan-400
        "
      />

      <p className="text-sm text-slate-300">
        {text}
      </p>
    </div>
  );
}

/* SKELETON */

function SavedSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
      "
    >
      {/* IMAGE */}
      <div
        className="
          h-[260px]
          bg-white/10
        "
      />

      {/* CONTENT */}
      <div className="p-6">
        {/* TOP */}
        <div
          className="
            mb-5 flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                h-12 w-12
                rounded-2xl
                bg-white/10
              "
            />

            <div>
              <div
                className="
                  mb-2 h-4
                  w-28 rounded-full
                  bg-white/10
                "
              />

              <div
                className="
                  h-3 w-20
                  rounded-full
                  bg-white/10
                "
              />
            </div>
          </div>

          <div
            className="
              h-12 w-12
              rounded-2xl
              bg-white/10
            "
          />
        </div>

        {/* TITLE */}
        <div
          className="
            mb-3 h-6
            w-full rounded-full
            bg-white/10
          "
        />

        <div
          className="
            mb-6 h-6
            w-2/3 rounded-full
            bg-white/10
          "
        />

        {/* BOTTOM */}
        <div
          className="
            flex items-center
            justify-between
          "
        >
          <div className="flex gap-4">
            <div
              className="
                h-5 w-20
                rounded-full
                bg-white/10
              "
            />

            <div
              className="
                h-5 w-20
                rounded-full
                bg-white/10
              "
            />
          </div>

          <div className="flex gap-3">
            <div
              className="
                h-12 w-12
                rounded-2xl
                bg-white/10
              "
            />

            <div
              className="
                h-12 w-12
                rounded-2xl
                bg-white/10
              "
            />

            <div
              className="
                h-12 w-12
                rounded-2xl
                bg-white/10
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
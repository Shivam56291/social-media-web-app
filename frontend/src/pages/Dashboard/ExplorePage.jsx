import { useEffect, useState } from "react";

import {
  MagnifyingGlass,
  TrendUp,
  Fire,
  Sparkle,
  UsersThree,
  Hash,
  Compass,
  SealCheck,
  PlayCircle,
  Heart,
  ArrowUpRight,
  Plus,
} from "@phosphor-icons/react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CATEGORIES = [
  "Trending",
  "Design",
  "Technology",
  "Startups",
  "React",
  "AI",
  "Gaming",
  "Photography",
];

const TRENDING_TOPICS = [
  {
    tag: "reactjs",
    posts: "18.2k posts",
    growth: "+24%",
  },
  {
    tag: "designsystem",
    posts: "12.4k posts",
    growth: "+18%",
  },
  {
    tag: "startup",
    posts: "9.8k posts",
    growth: "+32%",
  },
  {
    tag: "artificialintelligence",
    posts: "28.1k posts",
    growth: "+54%",
  },
];

const DISCOVER_USERS = [
  {
    name: "Sophia Carter",
    role: "UI/UX Designer",
    verified: true,
  },
  {
    name: "James Wilson",
    role: "Frontend Engineer",
    verified: false,
  },
  {
    name: "Emma Brown",
    role: "Startup Founder",
    verified: true,
  },
];

const EXPLORE_POSTS = [
  {
    title:
      "Building premium social platforms with React & TailwindCSS",
    likes: "12.4k",
    category: "Technology",
  },
  {
    title:
      "Modern glassmorphism UI trends in 2026",
    likes: "8.1k",
    category: "Design",
  },
  {
    title:
      "AI-powered startup ideas changing the internet",
    likes: "18.9k",
    category: "AI",
  },
];

export default function ExplorePage() {
  const [loading, setLoading] =
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
              <Compass
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
                Explore
              </h1>

              <p
                className="
                  mt-1 text-slate-400
                "
              >
                Discover trending creators,
                ideas, and communities
              </p>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <button
          data-tooltip-id="global-tooltip"
          data-tooltip-content="Create New Post"
          className="
            flex items-center gap-3
            rounded-2xl
            bg-gradient-to-r
            from-indigo-500
            to-cyan-500
            px-6 py-4
            font-semibold
            shadow-2xl
            shadow-indigo-500/20
            transition-all duration-300
            hover:scale-[1.03]
          "
        >
          <Plus size={20} />

          Create
        </button>
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
          placeholder="Search creators, communities, topics..."
          className="
            w-full bg-transparent
            text-sm outline-none
            placeholder:text-slate-500
          "
        />
      </div>

      {/* CATEGORIES */}
      <div
        className="
          mb-8 flex
          gap-3 overflow-x-auto
          pb-2
          scrollbar-hide
        "
      >
        {CATEGORIES.map(
          (category, index) => (
            <button
              key={category}
              data-tooltip-id="global-tooltip"
              data-tooltip-content={`Explore ${category}`}
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
              {category}
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
        {/* MAIN */}
        <div className="space-y-6">
          {loading ? (
            <>
              <ExploreSkeleton />
              <ExploreSkeleton />
              <ExploreSkeleton />
            </>
          ) : (
            EXPLORE_POSTS.map(
              (post, index) => (
                <ExploreCard
                  key={index}
                  post={post}
                />
              )
            )
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
            {/* TRENDING */}
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
                      from-orange-500
                      to-pink-500
                    "
                  >
                    <Fire
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
                      Trending
                    </h3>

                    <p className="text-sm text-slate-400">
                      Hot discussions today
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6">
                {TRENDING_TOPICS.map(
                  (topic) => (
                    <TrendingItem
                      key={topic.tag}
                      topic={topic}
                    />
                  )
                )}
              </div>
            </div>

            {/* DISCOVER PEOPLE */}
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
                    from-cyan-500
                    to-indigo-500
                  "
                >
                  <UsersThree
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
                    Discover
                  </h3>

                  <p className="text-sm text-slate-400">
                    Suggested creators
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {DISCOVER_USERS.map(
                  (user) => (
                    <UserCard
                      key={user.name}
                      user={user}
                    />
                  )
                )}
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
                Explore Insights
              </h3>

              <p
                className="
                  mt-3 leading-7
                  text-slate-400
                "
              >
                Personalized content,
                realtime trends, creator
                discovery, and AI-powered
                recommendations coming soon.
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

/* EXPLORE CARD */

function ExploreCard({ post }) {
  return (
    <div
      className="
        group overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/20
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative h-[280px]
          overflow-hidden
          bg-gradient-to-br
          from-indigo-500/30
          via-cyan-500/20
          to-pink-500/20
        "
      >
        <div
          className="
            absolute inset-0
            bg-black/10
          "
        />

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
          data-tooltip-content="View Content"
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
      <div className="p-6">
        <div
          className="
            mb-5 flex
            items-center gap-3
          "
        >
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
            S
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                ConnectSphere
              </h3>

              <SealCheck
                size={18}
                weight="fill"
                className="text-cyan-400"
              />
            </div>

            <p
              className="
                text-sm text-slate-400
              "
            >
              2 hours ago
            </p>
          </div>
        </div>

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
            mt-6 flex
            items-center
            justify-between
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
              <TrendUp
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm">
                Trending
              </span>
            </div>
          </div>

          <button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="Open Post"
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
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* TRENDING ITEM */

function TrendingItem({ topic }) {
  return (
    <div
      className="
        flex items-center
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
            from-orange-500/20
            to-pink-500/20
          "
        >
          <Hash
            size={20}
            className="text-orange-400"
          />
        </div>

        <div>
          <p className="font-semibold">
            #{topic.tag}
          </p>

          <p
            className="
              text-sm text-slate-400
            "
          >
            {topic.posts}
          </p>
        </div>
      </div>

      <div
        className="
          rounded-xl
          bg-emerald-500/10
          px-3 py-2
          text-sm font-semibold
          text-emerald-400
        "
      >
        {topic.growth}
      </div>
    </div>
  );
}

/* USER CARD */

function UserCard({ user }) {
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
            from-indigo-500
            to-cyan-500
            font-bold
          "
        >
          {user.name.charAt(0)}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {user.name}
            </h3>

            {user.verified && (
              <SealCheck
                size={18}
                weight="fill"
                className="text-cyan-400"
              />
            )}
          </div>

          <p
            className="
              text-sm text-slate-400
            "
          >
            {user.role}
          </p>
        </div>
      </div>

      <button
        data-tooltip-id="global-tooltip"
        data-tooltip-content={`Follow ${user.name}`}
        className="
          rounded-2xl
          bg-white
          px-4 py-2
          text-sm font-semibold
          text-black
          transition-all duration-300
          hover:scale-105
        "
      >
        Follow
      </button>
    </div>
  );
}

/* SKELETON */

function ExploreSkeleton() {
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
          h-[280px]
          bg-white/10
        "
      />

      {/* CONTENT */}
      <div className="p-6">
        <div className="mb-5 flex items-center gap-4">
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
                w-32 rounded-full
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
                h-5 w-24
                rounded-full
                bg-white/10
              "
            />
          </div>

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
  );
}
import { useEffect, useState } from "react";

import {
  House,
  Compass,
  Bell,
  ChatCircleDots,
  BookmarkSimple,
  SignOut,
  Heart,
  DotsThree,
  MagnifyingGlass,
  Plus,
  Fire,
  UsersThree,
  TrendUp,
} from "@phosphor-icons/react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const stories = [
    "Alex",
    "Sophia",
    "James",
    "Emma",
    "Lucas",
    "Olivia",
  ];

  const posts = [1, 2, 3];

  return (
    <div
      className="
        min-h-screen
        bg-[#070B14]
        text-white
      "
    >
      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className="
            hidden
            min-h-screen
            w-[260px]
            border-r border-white/10
            bg-white/[0.03]
            p-6
            lg:block
          "
        >
          {/* LOGO */}
          <div className="mb-10 flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                text-xl font-bold
              "
            >
              C
            </div>

            <div>
              <h1 className="text-xl font-black">
                ConnectSphere
              </h1>

              <p className="text-sm text-slate-400">
                Social Platform
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2">
            <SidebarItem
              icon={<House size={22} />}
              text="Home"
              active
            />

            <SidebarItem
              icon={
                <Compass size={22} />
              }
              text="Explore"
            />

            <SidebarItem
              icon={
                <Bell size={22} />
              }
              text="Notifications"
            />

            <SidebarItem
              icon={
                <ChatCircleDots size={22} />
              }
              text="Messages"
            />

            <SidebarItem
              icon={
                <BookmarkSimple size={22} />
              }
              text="Saved"
            />
          </nav>

          {/* USER */}
          <div
            className="
              mt-10 rounded-3xl
              border border-white/10
              bg-white/[0.03]
              p-5
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
                  text-lg font-bold
                "
              >
                {user?.username
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold">
                  {user?.username}
                </h3>

                <p className="text-sm text-slate-400">
                  @{user?.username}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
                mt-5 flex w-full
                items-center
                justify-center gap-2
                rounded-2xl
                border border-red-500/20
                bg-red-500/10
                px-4 py-3
                text-red-300
                transition-all
                hover:bg-red-500/20
              "
            >
              <SignOut size={18} />

              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            px-4 py-5
            sm:px-6
            lg:px-10
          "
        >
          {/* TOPBAR */}
          <div
            className="
              mb-8 flex
              items-center
              justify-between gap-4
            "
          >
            <div
              className="
                flex flex-1
                items-center gap-3
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                px-5 py-3
                max-w-xl
              "
            >
              <MagnifyingGlass
                size={20}
                className="text-slate-500"
              />

              <input
                type="text"
                placeholder="Search people, posts, communities..."
                className="
                  w-full bg-transparent
                  text-sm outline-none
                  placeholder:text-slate-500
                "
              />
            </div>

            <button
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                shadow-lg
                shadow-indigo-500/20
              "
            >
              <Plus size={22} />
            </button>
          </div>

          {/* STORIES */}
          <section className="mb-8">
            <div
              className="
                flex gap-5
                overflow-x-auto
                pb-2
                scrollbar-hide
              "
            >
              {stories.map((story) => (
                <div
                  key={story}
                  className="flex flex-col items-center"
                >
                  <div
                    className="
                      flex h-20 w-20
                      items-center justify-center
                      rounded-[28px]
                      bg-gradient-to-br
                      from-indigo-500
                      to-cyan-500
                      p-[2px]
                    "
                  >
                    <div
                      className="
                        flex h-full w-full
                        items-center justify-center
                        rounded-[26px]
                        bg-[#070B14]
                        text-lg font-bold
                      "
                    >
                      {story.charAt(0)}
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-300">
                    {story}
                  </p>
                </div>
              ))}
            </div>
          </section>

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
                    <PostSkeleton
                      key={i}
                    />
                  ))
                : posts.map((post) => (
                    <PostCard
                      key={post}
                      user={user}
                    />
                  ))}
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
                    rounded-3xl
                    border border-white/10
                    bg-white/[0.04]
                    p-6
                  "
                >
                  <div className="mb-5 flex items-center gap-3">
                    <Fire
                      size={22}
                      className="text-orange-400"
                    />

                    <h3 className="text-lg font-bold">
                      Trending
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <TrendingItem
                      tag="design"
                      posts="12.4k posts"
                    />

                    <TrendingItem
                      tag="reactjs"
                      posts="8.2k posts"
                    />

                    <TrendingItem
                      tag="startup"
                      posts="5.7k posts"
                    />
                  </div>
                </div>

                {/* COMMUNITIES */}
                <div
                  className="
                    rounded-3xl
                    border border-white/10
                    bg-white/[0.04]
                    p-6
                  "
                >
                  <div className="mb-5 flex items-center gap-3">
                    <UsersThree
                      size={22}
                      className="text-cyan-400"
                    />

                    <h3 className="text-lg font-bold">
                      Communities
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <CommunityItem name="UI/UX Designers" />

                    <CommunityItem name="React Developers" />

                    <CommunityItem name="Startup Founders" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

/* SIDEBAR ITEM */
function SidebarItem({
  icon,
  text,
  active,
}) {
  return (
    <button
      className={`
        flex w-full
        items-center gap-4
        rounded-2xl px-4 py-3
        transition-all
        ${
          active
            ? "bg-white text-black"
            : "text-slate-300 hover:bg-white/5"
        }
      `}
    >
      {icon}

      <span className="font-medium">
        {text}
      </span>
    </button>
  );
}

/* POST CARD */
function PostCard({ user }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5">
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
            {user?.username
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">
              {user?.username}
            </h3>

            <p className="text-sm text-slate-400">
              2 hours ago
            </p>
          </div>
        </div>

        <button>
          <DotsThree
            size={24}
            className="text-slate-400"
          />
        </button>
      </div>

      {/* IMAGE */}
      <div
        className="
          h-[320px]
          bg-gradient-to-br
          from-indigo-500/30
          via-cyan-500/20
          to-pink-500/20
        "
      />

      {/* CONTENT */}
      <div className="p-5">
        <div className="mb-4 flex items-center gap-5">
          <button>
            <Heart
              size={24}
              className="text-pink-400"
              weight="fill"
            />
          </button>

          <button>
            <ChatCircleDots
              size={24}
              className="text-slate-300"
            />
          </button>

          <button>
            <TrendUp
              size={24}
              className="text-slate-300"
            />
          </button>
        </div>

        <p className="leading-7 text-slate-300">
          Building a premium social media
          platform UI with React, Django,
          TailwindCSS, and modern motion
          animations ✨
        </p>
      </div>
    </div>
  );
}

/* SKELETON */
function PostSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
      "
    >
      <div className="flex items-center gap-4 p-5">
        <div
          className="
            h-14 w-14 rounded-2xl
            bg-white/10
          "
        />

        <div className="flex-1 space-y-2">
          <div
            className="
              h-4 w-40 rounded
              bg-white/10
            "
          />

          <div
            className="
              h-3 w-24 rounded
              bg-white/10
            "
          />
        </div>
      </div>

      <div
        className="
          h-[320px]
          bg-white/10
        "
      />

      <div className="space-y-3 p-5">
        <div
          className="
            h-4 w-full rounded
            bg-white/10
          "
        />

        <div
          className="
            h-4 w-2/3 rounded
            bg-white/10
          "
        />
      </div>
    </div>
  );
}

/* TRENDING */
function TrendingItem({
  tag,
  posts,
}) {
  return (
    <div>
      <p className="font-semibold">
        #{tag}
      </p>

      <p className="text-sm text-slate-400">
        {posts}
      </p>
    </div>
  );
}

/* COMMUNITY */
function CommunityItem({ name }) {
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
            h-12 w-12 rounded-2xl
            bg-gradient-to-br
            from-indigo-500/30
            to-cyan-500/30
          "
        />

        <div>
          <p className="font-medium">
            {name}
          </p>

          <p className="text-sm text-slate-400">
            12k members
          </p>
        </div>
      </div>

      <button
        className="
          rounded-xl
          bg-white px-4 py-2
          text-sm font-semibold
          text-black
        "
      >
        Join
      </button>
    </div>
  );
}
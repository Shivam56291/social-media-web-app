// src/pages/Dashboard/ProfilePage.jsx

import {
  PencilSimple,
  GridFour,
  BookmarkSimple,
  Heart,
} from "@phosphor-icons/react";

import { useSelector } from "react-redux";

const POSTS = [1, 2, 3, 4, 5, 6];

export default function ProfilePage() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="pb-16">
      {/* HEADER */}
      <div
        className="
          mb-12 rounded-[36px]
          border border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-md
        "
      >
        <div
          className="
            flex flex-col gap-10
            lg:flex-row
            lg:items-center
          "
        >
          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <div
              className="
                relative flex
                h-40 w-40
                items-center justify-center
                overflow-hidden
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                via-cyan-500
                to-pink-500
                p-[4px]
                shadow-2xl
                shadow-cyan-500/10
              "
            >
              <div
                className="
                  flex h-full w-full
                  items-center justify-center
                  overflow-hidden
                  rounded-full
                  bg-[#070B14]
                "
              >
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="
                      h-full w-full
                      object-cover
                    "
                  />
                ) : (
                  <span
                    className="
                      text-6xl font-black
                    "
                  >
                    {user?.username
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* PROFILE INFO */}
          <div className="flex-1">
            {/* TOP */}
            <div
              className="
                mb-8 flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <h1
                  className="
                    text-4xl font-black
                    tracking-tight
                  "
                >
                  {user?.username}
                </h1>

                <p
                  className="
                    mt-2 text-lg
                    text-slate-400
                  "
                >
                  @{user?.username}
                </p>
              </div>

              <button
                className="
                  flex items-center
                  gap-2 rounded-2xl
                  border border-white/10
                  bg-white/[0.05]
                  px-5 py-3
                  text-sm font-medium
                  transition-all
                  hover:bg-white/[0.08]
                  whitespace-nowrap
                "
              >
                <PencilSimple size={18} />

                Edit Profile
              </button>
            </div>

            {/* STATS */}
            <div
              className="
                mb-8 flex
                flex-wrap gap-8
              "
            >
              <StatItem
                value="248"
                label="Posts"
              />

              <StatItem
                value="24.8k"
                label="Followers"
              />

              <StatItem
                value="1,248"
                label="Following"
              />
            </div>

            {/* BIO */}
            <div className="max-w-2xl">
              <h3 className="font-bold">
                {user?.username}
              </h3>

              <p
                className="
                  mt-3 leading-8
                  text-slate-300
                "
              >
                {user?.bio ||
                  "Building modern web experiences with React, Django, TailwindCSS and scalable backend systems ✨"}
              </p>

              <p
                className="
                  mt-4 text-sm
                  text-cyan-400
                "
              >
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div
        className="
          mb-10 flex gap-6
          overflow-x-auto
          pb-2
        "
      >
        {[
          "Projects",
          "Travel",
          "Design",
          "Coding",
          "Friends",
        ].map((item) => (
          <div
            key={item}
            className="flex flex-col items-center"
          >
            <div
              className="
                flex h-24 w-24
                items-center justify-center
                rounded-full
                border border-white/10
                bg-white/[0.04]
              "
            >
              <div
                className="
                  h-20 w-20
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-500/30
                  to-cyan-500/30
                "
              />
            </div>

            <p
              className="
                mt-3 text-sm
                text-slate-300
              "
            >
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div
        className="
          mb-8 flex
          items-center gap-6
          border-t border-white/10
          pt-6
        "
      >
        <TabButton
          icon={<GridFour size={18} />}
          text="Posts"
          active
        />

        <TabButton
          icon={
            <BookmarkSimple size={18} />
          }
          text="Saved"
        />

        <TabButton
          icon={<Heart size={18} />}
          text="Liked"
        />
      </div>

      {/* POSTS GRID */}
      <div
        className="
          grid gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {POSTS.map((post) => (
          <div
            key={post}
            className="
              group relative
              aspect-square
              overflow-hidden
              rounded-[30px]
              border border-white/10
              bg-gradient-to-br
              from-indigo-500/20
              via-cyan-500/10
              to-pink-500/10
              transition-all
              hover:-translate-y-1
              hover:border-white/20
            "
          >
            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                flex items-center
                justify-center
                gap-8
                bg-black/60
                opacity-0
                backdrop-blur-sm
                transition-all
                group-hover:opacity-100
              "
            >
              <div className="flex items-center gap-2">
                <Heart
                  size={22}
                  weight="fill"
                />

                <span className="font-semibold">
                  2.4k
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BookmarkSimple
                  size={22}
                  weight="fill"
                />

                <span className="font-semibold">
                  184
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* STAT ITEM */
function StatItem({
  value,
  label,
}) {
  return (
    <div>
      <h3
        className="
          text-2xl font-black
        "
      >
        {value}
      </h3>

      <p className="mt-1 text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* TAB BUTTON */
function TabButton({
  icon,
  text,
  active,
}) {
  return (
    <button
      className={`
        flex items-center
        gap-2 rounded-2xl
        px-5 py-3
        text-sm font-medium
        transition-all
        ${
          active
            ? "bg-white text-black"
            : "text-slate-400 hover:bg-white/[0.04]"
        }
      `}
    >
      {icon}

      {text}
    </button>
  );
}
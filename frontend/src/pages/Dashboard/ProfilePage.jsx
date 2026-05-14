// src/pages/Dashboard/ProfilePage.jsx

import { useState } from "react";

import { useSelector } from "react-redux";

import {
  PencilSimple,
  GridFour,
  BookmarkSimple,
  Heart,
  CalendarBlank,
  Link,
} from "@phosphor-icons/react";

import EditProfileModal from "../../components/profile/EditProfileModal";

const POSTS = [1, 2, 3, 4, 5, 6];

export default function ProfilePage() {
  const [editOpen, setEditOpen] =
    useState(false);

  const { user } = useSelector(
    (state) => state.auth
  );

  /* FULL NAME */
  const fullName = [
    user?.first_name,
    user?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  /* JOIN DATE */
  const joinedDate = user?.created_at
    ? new Date(
        user.created_at
      ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "May 2026";

  return (
    <div className="pb-16">
      {/* PROFILE HEADER */}
      <div
        className="
          relative overflow-hidden
          rounded-[38px]
          border border-white/10
          bg-white/[0.03]
          p-6 backdrop-blur-md
          lg:p-8
        "
      >
        {/* BG GRADIENT */}
        <div
          className="
            absolute inset-x-0 top-0
            h-52
            bg-gradient-to-r
            from-indigo-500/10
            via-cyan-500/5
            to-pink-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          <div
            className="
              flex flex-col gap-10
              lg:flex-row
              lg:items-start
            "
          >
            {/* AVATAR */}
            <div
              className="
                flex justify-center
                lg:justify-start
              "
            >
              <div
                className="
                  relative flex
                  h-40 w-40
                  items-center
                  justify-center
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
                    items-center
                    justify-center
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
                        text-6xl
                        font-black
                        text-white
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

            {/* RIGHT SIDE */}
            <div className="flex-1">
              {/* TOP SECTION */}
              <div
                className="
                  flex flex-col gap-6
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                "
              >
                {/* USER INFO */}
                <div>
                  {/* FULL NAME */}
                  <h1
                    className="
                      text-4xl
                      font-black
                      tracking-tight
                      text-white
                    "
                  >
                    {fullName ||
                      user?.username}
                  </h1>

                  {/* USERNAME */}
                  <p
                    className="
                      mt-2 text-lg
                      text-slate-400
                    "
                  >
                    @{user?.username}
                  </p>

                  {/* EMAIL */}
                  <p
                    className="
                      mt-3 text-sm
                      text-cyan-400
                    "
                  >
                    {user?.email}
                  </p>

                  {/* META */}
                  <div
                    className="
                      mt-5 flex
                      flex-wrap gap-5
                      text-sm
                      text-slate-400
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-2
                      "
                    >
                      <CalendarBlank
                        size={18}
                        weight="duotone"
                      />

                      Joined {joinedDate}
                    </div>

                    <div
                      className="
                        flex items-center
                        gap-2
                      "
                    >
                      <Link
                        size={18}
                        weight="duotone"
                      />

                      connectsphere.dev
                    </div>
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    setEditOpen(true)
                  }
                  className="
                    flex items-center
                    justify-center
                    gap-2 rounded-2xl
                    border border-white/10
                    bg-white/[0.05]
                    px-6 py-3
                    text-sm font-medium
                    text-white
                    transition-all
                    hover:border-white/20
                    hover:bg-white/[0.08]
                    whitespace-nowrap
                  "
                >
                  <PencilSimple
                    size={18}
                    weight="bold"
                  />

                  Edit Profile
                </button>
              </div>

              {/* STATS */}
              <div
                className="
                  mt-10 flex
                  flex-wrap gap-10
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
              <div className="mt-10 max-w-3xl">
                <p
                  className="
                    text-[15px]
                    leading-8
                    text-slate-300
                    lg:text-base
                  "
                >
                  {user?.bio ||
                    "Building modern web experiences with React, Django, scalable backend systems and beautifully crafted user interfaces ✨"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div
        className="
          mt-10 mb-12
          flex gap-6
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
            className="
              flex flex-col
              items-center
            "
          >
            <div
              className="
                flex h-24 w-24
                items-center
                justify-center
                rounded-full
                border border-white/10
                bg-white/[0.04]
                transition-all
                hover:border-white/20
                hover:bg-white/[0.06]
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
          items-center gap-4
          border-t border-white/10
          pt-6
        "
      >
        <TabButton
          icon={
            <GridFour
              size={18}
              weight="fill"
            />
          }
          text="Posts"
          active
        />

        <TabButton
          icon={
            <BookmarkSimple
              size={18}
              weight="duotone"
            />
          }
          text="Saved"
        />

        <TabButton
          icon={
            <Heart
              size={18}
              weight="duotone"
            />
          }
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
              transition-all duration-300
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
              <div
                className="
                  flex items-center
                  gap-2
                "
              >
                <Heart
                  size={22}
                  weight="fill"
                />

                <span className="font-semibold">
                  2.4k
                </span>
              </div>

              <div
                className="
                  flex items-center
                  gap-2
                "
              >
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

/* STAT ITEM */
function StatItem({
  value,
  label,
}) {
  return (
    <div>
      <h3
        className="
          text-2xl
          font-black
          text-white
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-1 text-sm
          text-slate-400
        "
      >
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
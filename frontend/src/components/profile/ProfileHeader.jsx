import {
  PencilSimple,
  CalendarBlank,
  Sparkle,
} from "@phosphor-icons/react";

import {
  motion,
} from "framer-motion";

export default function ProfileHeader({
  user,
  postsCount,
  onEdit,
}) {

  const fullName = [
    user?.first_name,
    user?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  const joinedDate =
    user?.created_at
      ? new Date(
          user.created_at
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        )
      : "May 2026";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
        relative overflow-hidden
        rounded-[40px]
        border border-white/10
        bg-white/[0.04]
        p-8
        backdrop-blur-2xl
      "
    >

      {/* GLOW */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-cyan-500/10
          via-indigo-500/5
          to-pink-500/10
        "
      />

      <div className="relative z-10">

        <div
          className="
            flex flex-col
            gap-10
            lg:flex-row
          "
        >

          {/* AVATAR */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
              relative
              mx-auto
              h-44 w-44
              lg:mx-0
            "
          >

            <div
              className="
                absolute inset-0
                rounded-full
                bg-gradient-to-br
                from-cyan-500
                via-indigo-500
                to-pink-500
                blur-2xl
                opacity-40
              "
            />

            <div
              className="
                relative flex
                h-full w-full
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border border-white/20
                bg-[#0B1120]
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

          </motion.div>

          {/* INFO */}
          <div className="flex-1">

            <div
              className="
                flex flex-col
                gap-6
                lg:flex-row
                lg:items-start
                lg:justify-between
              "
            >

              <div>

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

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

                  <Sparkle
                    size={28}
                    weight="fill"
                    className="
                      text-cyan-400
                    "
                  />

                </div>

                <p
                  className="
                    mt-2
                    text-lg
                    text-slate-400
                  "
                >
                  @{user?.username}
                </p>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    leading-8
                    text-slate-300
                  "
                >
                  {user?.bio ||
                    "Crafting beautiful digital experiences with React, Django & scalable systems ✨"}
                </p>

                <div
                  className="
                    mt-6 flex
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
                    />

                    Joined {joinedDate}

                  </div>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={onEdit}
                className="
                  flex items-center
                  gap-2 rounded-2xl
                  border border-white/10
                  bg-white/[0.05]
                  px-6 py-3
                  text-sm font-medium
                  text-white
                  transition-all
                  hover:border-cyan-400/30
                  hover:bg-cyan-500/10
                  hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
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
                flex-wrap gap-6
              "
            >

              <StatCard
                value={postsCount}
                label="Posts"
              />

              <StatCard
                value="24.8k"
                label="Followers"
              />

              <StatCard
                value="1.2k"
                label="Following"
              />

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

function StatCard({
  value,
  label,
}) {

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        px-7 py-5
        backdrop-blur-xl
      "
    >

      <h3
        className="
          text-3xl
          font-black
          text-white
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-slate-400
        "
      >
        {label}
      </p>

    </div>
  );
}
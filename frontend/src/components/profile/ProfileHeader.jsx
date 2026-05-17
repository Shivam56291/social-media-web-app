import {
  PencilSimple,
} from "@phosphor-icons/react";

import { motion } from "framer-motion";

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

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-2xl
        border border-white/10
        bg-[#0F172A]
        px-5 py-7
        md:px-8 md:py-8
      "
    >

      <div
        className="
          flex flex-col
          gap-7
          md:flex-row
          md:items-start
        "
      >

        {/* PROFILE IMAGE */}
        <div
          className="
            flex justify-center
            md:block
          "
        >

          <div
            className="
              h-28 w-28
              overflow-hidden
              rounded-full
              ring-2 ring-white/10
              bg-[#1E293B]
            "
          >

            {user?.avatar_url ? (

              <img
                src={user.avatar_url}
                alt={user?.username}
                className="
                  h-full w-full
                  object-cover
                "
              />

            ) : (

              <div
                className="
                  flex h-full
                  w-full items-center
                  justify-center
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {user?.username
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

            )}

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* TOP */}
          <div
            className="
              flex items-start
              justify-between
              gap-4
              flex-wrap
            "
          >

            <div>

              {/* USERNAME */}
              <h1
                className="
                  text-[18px]
                  font-medium
                  tracking-tight
                  text-slate-300
                "
              >
                @{user?.username}
              </h1>

              {/* STATS */}
              <div
                className="
                  mt-5 flex
                  items-center
                  gap-5
                  text-sm
                  flex-wrap
                "
              >

                <Stat
                  value={postsCount}
                  label="posts"
                />

                <Stat
                  value="24.8k"
                  label="followers"
                />

                <Stat
                  value="1.2k"
                  label="following"
                />

              </div>

            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={onEdit}
              className="
                flex items-center
                gap-2
                rounded-lg
                border border-white/10
                bg-white/[0.04]
                px-4 py-2
                text-sm
                font-medium
                text-slate-200
                transition-all duration-200
                hover:bg-white/[0.08]
              "
            >

              <PencilSimple
                size={15}
                weight="bold"
              />

              Edit profile

            </button>

          </div>

          {/* NAME + BIO */}
          <div className="mt-6">

            <h2
              className="
                text-[20px]
                font-semibold
                tracking-tight
                text-white
              "
            >
              {fullName ||
                "Unknown User"}
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-[15px]
                leading-7
                text-slate-300
              "
            >
              {user?.bio ||
                "Full Stack Developer building scalable and modern web applications with React & Django."}
            </p>

          </div>

        </div>

      </div>

    </motion.section>
  );
}

function Stat({
  value,
  label,
}) {

  return (
    <div
      className="
        rounded-lg
        bg-white/[0.05]
        px-3 py-2
      "
    >

      <span
        className="
          font-semibold
          text-white
        "
      >
        {value}
      </span>

      <span
        className="
          ml-1
          text-slate-400
        "
      >
        {label}
      </span>

    </div>
  );
}
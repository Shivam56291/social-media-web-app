import { useEffect, useState } from "react";

import {
  Bell,
  Heart,
  ChatCircleDots,
  UserPlus,
  Repeat,
  CheckCircle,
  DotsThree,
  Gear,
  FunnelSimple,
} from "@phosphor-icons/react";

const FILTERS = [
  "All",
  "Likes",
  "Comments",
  "Follows",
  "Mentions",
];

export default function NotificationsPage() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
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
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-3xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                shadow-lg
                shadow-indigo-500/20
              "
            >
              <Bell
                size={26}
                weight="fill"
              />
            </div>

            <div>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                "
              >
                Notifications
              </h1>

              <p className="text-slate-400">
                Stay updated with everything
                happening in your network
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            className="
              flex items-center gap-2
              rounded-2xl
              border border-white/10
              bg-white/[0.05]
              px-5 py-3
              text-sm font-medium
              text-slate-300
              transition-all
              hover:bg-white/[0.08]
            "
          >
            <FunnelSimple size={18} />
            Filter
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-2xl
              bg-gradient-to-r
              from-indigo-500
              to-cyan-500
              px-5 py-3
              text-sm font-semibold
              shadow-lg
              shadow-indigo-500/20
              transition-all
              hover:scale-[1.02]
            "
          >
            <Gear size={18} />
            Settings
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div
        className="
          mb-8 flex
          gap-3 overflow-x-auto
          scrollbar-hide
        "
      >
        {FILTERS.map((filter, index) => (
          <button
            key={filter}
            className={`
              whitespace-nowrap
              rounded-2xl
              px-5 py-3
              text-sm font-medium
              transition-all
              ${
                index === 0
                  ? "bg-white text-black"
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
        ))}
      </div>

      {/* CONTENT */}
      <div
        className="
          grid gap-8
          xl:grid-cols-[1fr_320px]
        "
      >
        {/* NOTIFICATIONS */}
        <div className="space-y-5">
          {loading ? (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          ) : (
            <>
              <NotificationCard
                icon={
                  <Heart
                    size={22}
                    weight="fill"
                  />
                }
                iconBg="from-pink-500 to-rose-500"
                title="Sophia liked your post"
                message="Your recent design system post is getting traction."
                time="2 min ago"
                unread
              />

              <NotificationCard
                icon={
                  <ChatCircleDots
                    size={22}
                    weight="fill"
                  />
                }
                iconBg="from-cyan-500 to-blue-500"
                title="James commented on your post"
                message="“This UI looks insanely clean 🔥”"
                time="12 min ago"
                unread
              />

              <NotificationCard
                icon={
                  <UserPlus
                    size={22}
                    weight="fill"
                  />
                }
                iconBg="from-indigo-500 to-violet-500"
                title="Emma started following you"
                message="You now have 12.4k followers."
                time="1 hour ago"
              />

              <NotificationCard
                icon={
                  <Repeat
                    size={22}
                    weight="fill"
                  />
                }
                iconBg="from-emerald-500 to-teal-500"
                title="Lucas shared your post"
                message="Your startup thread was shared to React Developers."
                time="3 hours ago"
              />

              <NotificationCard
                icon={
                  <CheckCircle
                    size={22}
                    weight="fill"
                  />
                }
                iconBg="from-orange-500 to-amber-500"
                title="Profile verification updated"
                message="Your account verification request is under review."
                time="Yesterday"
              />
            </>
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
            {/* INSIGHTS */}
            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
              "
            >
              <div
                className="
                  bg-gradient-to-br
                  from-indigo-500/20
                  via-cyan-500/10
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
                  <Bell
                    size={26}
                    weight="fill"
                  />
                </div>

                <h3
                  className="
                    text-2xl
                    font-black
                  "
                >
                  Activity Insights
                </h3>

                <p
                  className="
                    mt-2 leading-7
                    text-slate-400
                  "
                >
                  Track interactions,
                  engagement, and audience
                  activity across your profile.
                </p>
              </div>

              <div className="space-y-5 p-6">
                <InsightItem
                  label="New Followers"
                  value="+248"
                />

                <InsightItem
                  label="Post Engagement"
                  value="+18%"
                />

                <InsightItem
                  label="Mentions"
                  value="84"
                />
              </div>
            </div>

            {/* UPCOMING */}
            <div
              className="
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                p-6
              "
            >
              <h3
                className="
                  mb-5 text-xl
                  font-bold
                "
              >
                Coming Soon
              </h3>

              <div className="space-y-4">
                <FeatureItem text="Realtime push notifications" />

                <FeatureItem text="Smart notification filters" />

                <FeatureItem text="Mention activity tracking" />

                <FeatureItem text="Notification analytics" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* NOTIFICATION CARD */

function NotificationCard({
  icon,
  iconBg,
  title,
  message,
  time,
  unread,
}) {
  return (
    <div
      className="
        group relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.06]
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute inset-0
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
          bg-gradient-to-r
          from-indigo-500/5
          via-cyan-500/5
          to-transparent
        "
      />

      <div className="relative flex gap-4">
        {/* ICON */}
        <div
          className={`
            flex h-14 w-14
            shrink-0 items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            ${iconBg}
            shadow-lg
          `}
        >
          {icon}
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <div
            className="
              mb-2 flex
              items-start
              justify-between gap-4
            "
          >
            <div>
              <h3 className="font-semibold">
                {title}
              </h3>

              <p
                className="
                  mt-1 leading-7
                  text-slate-400
                "
              >
                {message}
              </p>
            </div>

            <button
              className="
                opacity-0
                transition-all
                group-hover:opacity-100
              "
            >
              <DotsThree
                size={22}
                className="text-slate-500"
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <p
              className="
                text-sm text-slate-500
              "
            >
              {time}
            </p>

            {unread && (
              <div
                className="
                  h-2.5 w-2.5
                  rounded-full
                  bg-cyan-400
                  shadow-lg
                  shadow-cyan-400/50
                "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* SKELETON */

function NotificationSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        p-5
      "
    >
      <div className="flex gap-4">
        <div
          className="
            h-14 w-14
            rounded-2xl
            bg-white/10
          "
        />

        <div className="flex-1">
          <div
            className="
              mb-3 h-4
              w-2/3 rounded-full
              bg-white/10
            "
          />

          <div
            className="
              mb-2 h-3
              w-full rounded-full
              bg-white/10
            "
          />

          <div
            className="
              h-3 w-1/2
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              mt-5 h-3
              w-20 rounded-full
              bg-white/10
            "
          />
        </div>
      </div>
    </div>
  );
}

/* INSIGHT */

function InsightItem({
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        justify-between
      "
    >
      <p className="text-slate-400">
        {label}
      </p>

      <p className="font-bold">
        {value}
      </p>
    </div>
  );
}

/* FEATURE */

function FeatureItem({ text }) {
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
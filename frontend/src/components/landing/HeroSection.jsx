import { motion } from "framer-motion";

import {
  MessageCircle,
  Users,
  Sparkles,
} from "lucide-react";

import FloatingCard from "./FloatingCard";

export default function HeroSection() {
  return (
    <div
      className="
        relative flex w-full
        flex-col justify-between
        overflow-hidden
        px-6 py-8
        sm:px-8
        lg:px-12 lg:py-12
      "
    >
      {/* BG */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.18),transparent_30%)]
        "
      />

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10"
      >
        {/* LOGO */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-cyan-500
              p-3
            "
          >
            <Sparkles className="text-white" />
          </div>

          <h1
            className="
              text-xl font-bold
              tracking-tight
              text-white
              sm:text-2xl
            "
          >
            ConnectSphere
          </h1>
        </div>

        {/* HEADING */}
        <div className="max-w-xl">
          <h2
            className="
              text-3xl
              font-black
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Real conversations.

            <span
              className="
                bg-gradient-to-r
                from-indigo-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Meaningful communities.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-lg
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            Join creators, developers,
            founders, and communities in
            a premium social platform
            built for authentic
            interaction and real-time
            connections.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <Users className="text-cyan-400" />

              <p className="text-sm text-slate-300 sm:text-base">
                Discover communities
                tailored to your
                interests
              </p>
            </div>

            <div className="flex items-center gap-4">
              <MessageCircle className="text-indigo-400" />

              <p className="text-sm text-slate-300 sm:text-base">
                Engage in meaningful
                real-time discussions
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FLOATING CARDS */}
      <div
        className="
          relative mt-10
          hidden h-[240px]
          lg:block
        "
      >
        <FloatingCard
          title="Live Discussions"
          text="12.4k active conversations"
          className="left-10 top-10 w-64"
          icon={
            <MessageCircle className="text-indigo-400" />
          }
        />

        <FloatingCard
          title="Communities"
          text="Creators growing daily"
          className="right-10 top-20 w-60"
          icon={
            <Users className="text-cyan-400" />
          }
        />
      </div>
    </div>
  );
}
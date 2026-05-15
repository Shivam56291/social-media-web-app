import { Fire } from "@phosphor-icons/react";

import TrendingItem from "./TrendingItem";

import {
  TRENDING,
} from "../../constants/feedData";

export default function TrendingSection() {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
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
        {TRENDING.map((item) => (
          <TrendingItem
            key={item.tag}
            tag={item.tag}
            posts={item.posts}
          />
        ))}
      </div>
    </div>
  );
}
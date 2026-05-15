import { UsersThree } from "@phosphor-icons/react";

import CommunityItem from "./CommunityItem";

import {
  COMMUNITIES,
} from "../../constants/feedData";

export default function CommunitiesSection() {
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
        <UsersThree
          size={22}
          className="text-cyan-400"
        />

        <h3 className="text-lg font-bold">
          Communities
        </h3>
      </div>

      <div className="space-y-4">
        {COMMUNITIES.map((name) => (
          <CommunityItem
            key={name}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}
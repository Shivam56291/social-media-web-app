import StoryAvatar from "./StoryAvatar";

import {
  STORIES,
} from "../../constants/feedData";

export default function StoriesBar() {
  return (
    <section className="mb-8">
      <div
        className="
          flex gap-5
          overflow-x-auto
          pb-2
          scrollbar-hide
        "
      >
        {STORIES.map((story) => (
          <StoryAvatar
            key={story}
            name={story}
          />
        ))}
      </div>
    </section>
  );
}
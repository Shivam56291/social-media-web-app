import TrendingSection from "./TrendingSection";
import CommunitiesSection from "./CommunitiesSection";

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block">
      <div
        className="
          sticky top-6
          space-y-6
        "
      >
        <TrendingSection />

        <CommunitiesSection />
      </div>
    </aside>
  );
}
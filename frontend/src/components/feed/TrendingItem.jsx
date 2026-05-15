export default function TrendingItem({
  tag,
  posts,
}) {
  return (
    <div
      data-tooltip-id="global-tooltip"
      data-tooltip-content={`Explore #${tag}`}
      className="
        cursor-pointer
        transition-all
        duration-300
        hover:translate-x-1
      "
    >
      <p className="font-semibold">
        #{tag}
      </p>

      <p className="text-sm text-slate-400">
        {posts}
      </p>
    </div>
  );
}
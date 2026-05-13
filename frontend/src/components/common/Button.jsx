import Loader from "./Loader";

export default function Button({
  children,
  loading = false,
  loadingText = "Please wait...",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        relative flex w-full items-center
        justify-center overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-indigo-500 to-violet-500
        px-5 py-3.5
        font-semibold text-white
        transition-all duration-300
        hover:scale-[1.01]
        hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader text={loadingText} />
      ) : (
        children
      )}
    </button>
  );
}
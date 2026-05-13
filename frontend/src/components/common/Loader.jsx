import { LoaderCircle } from "lucide-react";

export default function Loader({
  text = "Please wait...",
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <LoaderCircle
        size={20}
        className="animate-spin text-white"
      />

      <span className="text-sm font-medium text-white">
        {text}
      </span>
    </div>
  );
}
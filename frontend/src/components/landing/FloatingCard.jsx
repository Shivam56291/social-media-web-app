import { motion } from "framer-motion";

export default function FloatingCard({
  icon,
  title,
  text,
  className,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
      }}
      className={`
        absolute rounded-3xl border border-white/10
        bg-white/5 p-5 backdrop-blur-2xl
        shadow-2xl
        ${className}
      `}
    >
      <div className="mb-3">{icon}</div>

      <h4 className="font-semibold text-white">
        {title}
      </h4>

      <p className="mt-1 text-sm text-slate-400">
        {text}
      </p>
    </motion.div>
  );
}
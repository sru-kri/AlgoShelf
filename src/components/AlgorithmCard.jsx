import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function AlgorithmCard({
  chapter,
  title,
  description,
  complexity,
  difficulty,
  path,
  comingSoon = false,
}) {
  const difficultyColor =
    difficulty === "Beginner"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  const cardContent = (
    <div
      className={`group relative flex h-full overflow-hidden rounded-[22px] border border-[#E8DED2] bg-[#FFFDF8] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        comingSoon
          ? "opacity-85 cursor-not-allowed"
          : "hover:shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
      }`}
    >
      {/* Hardcover Spine */}
      <div
        className={`absolute inset-y-0 left-0 w-5 ${
          comingSoon
            ? "bg-gradient-to-b from-[#A3998F] via-[#8A8077] to-[#70675F]"
            : "bg-gradient-to-b from-[#B88457] via-[#9A6A45] to-[#7A5236]"
        }`}
      />

      <div className="absolute left-[3px] top-0 h-full w-[2px] bg-white/35" />

      {/* Content */}
      <div className="ml-6 flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A07A56]">
            {chapter}
          </p>
          {comingSoon && (
            <span className="rounded-full border border-[#D9C8B5] bg-[#F7F2EB] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A6645]">
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="mt-5 font-display text-3xl leading-tight text-[#202020]">
          {title}
        </h3>

        <p className="mt-4 flex-1 leading-7 text-[#666]">
          {description}
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-[#F7F5F2] px-3 py-2 text-sm">
            <Clock3 size={15} />
            {complexity}
          </div>

          <div
            className={`rounded-full px-3 py-2 text-sm font-medium ${difficultyColor}`}
          >
            {difficulty}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-[#EFE6DA] pt-5">
          {comingSoon ? (
            <>
              <span className="flex items-center gap-2 font-medium text-[#8C837B]">
                <Lock size={15} />
                Under Development
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
                Coming Soon
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 font-medium text-[#9D7653]">
                <Sparkles size={16} />
                Open Chapter
              </span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </div>
      </div>

      {/* Page Edge */}
      <div className="absolute right-0 top-0 h-full w-[8px] bg-gradient-to-l from-[#ECE8E2] via-[#F9F8F5] to-transparent" />

      {/* Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/80" />
    </div>
  );

  return (
    <motion.div
      whileHover={
        comingSoon
          ? { y: -2 }
          : {
              y: -10,
              rotate: -1,
            }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
    >
      {comingSoon ? (
        cardContent
      ) : (
        <Link to={path} className="block h-full">
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}

export default AlgorithmCard;
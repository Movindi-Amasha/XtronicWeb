import type { SkillLevel } from "@/lib/products";
import { SKILL_STYLE } from "@/lib/skillLevels";

/** Little signal-bars badge, e.g. ▮▯▯ Beginner. */
export default function SkillBadge({ level, className = "" }: { level: SkillLevel; className?: string }) {
  const { color, bars } = SKILL_STYLE[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide shadow sm:text-[11px] ${className}`}
      style={{ color }}
      title={`Skill level: ${level}`}
    >
      <span aria-hidden className="flex items-end gap-[2px]">
        {[1, 2, 3].map((n) => (
          <span key={n} className="w-[3px] rounded-sm" style={{ height: 4 + n * 3, background: n <= bars ? color : "#d6dde8" }} />
        ))}
      </span>
      {level}
    </span>
  );
}

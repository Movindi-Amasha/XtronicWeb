import type { SkillLevel } from "@/lib/products";
import { LOGO } from "@/lib/brandColors";

export const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];

/** Colour + number of filled bars (out of 3) for each level. */
export const SKILL_STYLE: Record<SkillLevel, { color: string; bars: number }> = {
  Beginner: { color: LOGO.green, bars: 1 },
  Intermediate: { color: LOGO.orange, bars: 2 },
  Advanced: { color: LOGO.red, bars: 3 },
};

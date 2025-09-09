// src/solver.ts
import {
  CIGARETTES,
  COLORS,
  DRINKS,
  House,
  HouseNumber,
  NATIONALITIES,
  PETS,
} from './';
import type { Rule } from './rules';

// Generate all single-house candidates for a specific position (1..5)
function candidatesForPosition(pos: HouseNumber): House[] {
  const out: House[] = [];
  for (const color of COLORS)
    for (const nationality of NATIONALITIES)
      for (const cigarettes of CIGARETTES)
        for (const drink of DRINKS)
          for (const pet of PETS) {
            out.push(
              new House(pos, color, nationality, cigarettes, drink, pet)
            );
          }
  return out;
}

// Optional helper: all candidates for all positions (useful for diagnostics)
// export function allPossibleHouses(): House[] {
//   const all: House[] = [];
//   for (let pos = 1; pos <= 5; pos++) all.push(...candidatesForPosition(pos));
//   return all;
// }

// Enforce bijection across attributes (no repeats across the 5 houses)
type UniqueKey = keyof Pick<
  House,
  'color' | 'nationality' | 'cigarettes' | 'drink' | 'pet'
>;
const UNIQUE_KEYS: UniqueKey[] = [
  'color',
  'nationality',
  'cigarettes',
  'drink',
  'pet',
];

function isUniqueSoFar(partial: House[], cand: House): boolean {
  return UNIQUE_KEYS.every(k => !partial.some(h => h[k] === cand[k]));
}

// Every placed house must still satisfy all rules given the current partial
function allRulesHoldForAll(partial: House[], rules: Rule[]): boolean {
  return partial.every(h => rules.every(r => r(h, partial)));
}

// Backtracking solver. Rules must be "partial-friendly" (return true when info is insufficient).
export function solveZebra(rules: Rule[]): House[] {
  // Precompute candidate sets per position
  const byPos: House[][] = Array.from({ length: 5 }, (_, i) =>
    candidatesForPosition((i + 1) as HouseNumber)
  );

  const solution: House[] = [];

  function search(posIndex: number): boolean {
    if (posIndex === 5) return true; // all 5 placed

    for (const cand of byPos[posIndex]) {
      if (!isUniqueSoFar(solution, cand)) continue;

      const next = [...solution, cand];
      if (!allRulesHoldForAll(next, rules)) continue;

      solution.push(cand);
      if (search(posIndex + 1)) return true;
      solution.pop();
    }
    return false;
  }

  if (!search(0)) {
    throw new Error(
      'No solution found. Check your rules for contradictions or early rejections.'
    );
  }

  return solution.sort((a, b) => a.houseNumber - b.houseNumber);
}

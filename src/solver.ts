// src/solver.ts
import { House } from './house';
import type { Rule } from './rules';
import * as vars from './variables';

// Enumerate valid values (exclude the enum's Invalid = 0)
const COLORS = [
  vars.Colors.Red,
  vars.Colors.Green,
  vars.Colors.Blue,
  vars.Colors.Ivory,
  vars.Colors.Yellow,
] as const;

const NATIONALITIES = [
  vars.Nationality.Englishman,
  vars.Nationality.Spaniard,
  vars.Nationality.Ukrainian,
  vars.Nationality.Norwegian,
  vars.Nationality.Japanese,
] as const;

const CIGARETTES = [
  vars.Cigarettes.OldGold,
  vars.Cigarettes.Kools,
  vars.Cigarettes.Chesterfields,
  vars.Cigarettes.LuckyStrike,
  vars.Cigarettes.Parliaments,
] as const;

const DRINKS = [
  vars.Drinks.Coffee,
  vars.Drinks.Tea,
  vars.Drinks.Milk,
  vars.Drinks.OrangeJuice,
  vars.Drinks.Water,
] as const;

const PETS = [
  vars.Pets.Dog,
  vars.Pets.Snail,
  vars.Pets.Fox,
  vars.Pets.Horse,
  vars.Pets.Zebra,
] as const;

// Generate all single-house candidates for a specific position (1..5)
function candidatesForPosition(pos: number): House[] {
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
    candidatesForPosition(i + 1)
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

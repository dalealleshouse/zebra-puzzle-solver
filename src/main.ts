import { performance } from 'node:perf_hooks';

import { House } from './house';
import { rules } from './rules';
import { solveZebra } from './solver';
import * as vars from './variables';

// Map numeric enum value -> readable name (TypeScript reverse mapping)
const enumLabel = (e: any, v: number) => e[v];

function rowFromHouse(h: House) {
  return [
    h.houseNumber,
    enumLabel(vars.Colors, h.color),
    enumLabel(vars.Nationality, h.nationality),
    enumLabel(vars.Cigarettes, h.cigarettes),
    enumLabel(vars.Drinks, h.drink),
    enumLabel(vars.Pets, h.pet),
  ];
}

function printTable(houses: House[]) {
  const header = ['Pos', 'Color', 'Nationality', 'Cigarettes', 'Drink', 'Pet'];
  const rows = houses.map(rowFromHouse);
  const widths = header.map((hdr, i) =>
    Math.max(hdr.length, ...rows.map(r => String(r[i]).length))
  );
  const fmt = (cells: unknown[]) =>
    cells.map((c, i) => String(c).padEnd(widths[i], ' ')).join(' | ');

  console.log(fmt(header));
  console.log(widths.map(w => '-'.repeat(w)).join('-|-'));
  rows.forEach(r => console.log(fmt(r)));
}

function main() {
  const asJson = process.argv.includes('--json');

  const t0 = performance.now();
  const houses = solveZebra(rules);
  const t1 = performance.now();

  if (asJson) {
    const out = houses.map(h => ({
      houseNumber: h.houseNumber,
      color: enumLabel(vars.Colors, h.color),
      nationality: enumLabel(vars.Nationality, h.nationality),
      cigarettes: enumLabel(vars.Cigarettes, h.cigarettes),
      drink: enumLabel(vars.Drinks, h.drink),
      pet: enumLabel(vars.Pets, h.pet),
    }));
    console.log(
      JSON.stringify({ houses: out, ms: +(t1 - t0).toFixed(3) }, null, 2)
    );
    return;
  }

  printTable(houses);

  const waterDrinker = houses.find(h => h.drink === vars.Drinks.Water)!;
  const zebraOwner = houses.find(h => h.pet === vars.Pets.Zebra)!;

  console.log('');
  console.log(
    `Water is drunk by the ${enumLabel(vars.Nationality, waterDrinker.nationality)}.`
  );
  console.log(
    `The zebra is owned by the ${enumLabel(vars.Nationality, zebraOwner.nationality)}.`
  );
  console.log(`\nSolved in ${(t1 - t0).toFixed(3)} ms.`);
}

main();

// src/main.ts
import { performance } from 'node:perf_hooks';

import { House } from './house';
import { rules } from './rules';
import { solveZebra } from './solver';
import { Drinks, Pets } from './variables';

// re-exports from vocab

const title = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());

function rowFromHouse(h: House) {
  return [
    h.houseNumber,
    title(h.color),
    title(h.nationality),
    title(h.cigarettes),
    title(h.drink),
    title(h.pet),
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
      color: h.color,
      nationality: h.nationality,
      cigarettes: h.cigarettes,
      drink: h.drink,
      pet: h.pet,
    }));
    console.log(
      JSON.stringify({ houses: out, ms: +(t1 - t0).toFixed(3) }, null, 2)
    );
    return;
  }

  printTable(houses);

  const waterDrinker = houses.find(h => h.drink === Drinks.Water)!;
  const zebraOwner = houses.find(h => h.pet === Pets.Zebra)!;

  console.log('');
  console.log(`Water is drunk by the ${title(waterDrinker.nationality)}.`);
  console.log(`The zebra is owned by the ${title(zebraOwner.nationality)}.`);
  console.log(`\nSolved in ${(t1 - t0).toFixed(3)} ms.`);
}

main();

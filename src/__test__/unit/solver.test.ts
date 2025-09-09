import { House, rules, solveZebra } from '../../.';
import { Cigarettes, Colors, Drinks, Nationality, Pets } from '../../variables';

describe.skip('solver should', () => {
  it('should return known solution to problem', () => {
    const result = solveZebra(rules);

    expect(result).toEqual([
      new House(
        1,

        Colors.Yellow,
        Nationality.Norwegian,
        Cigarettes.Kools,
        Drinks.Water,
        Pets.Fox
      ),
    ]);
  });
});

const uniq = <T>(arr: T[]) => new Set(arr).size === arr.length;

function maps(houses: House[]) {
  const posByColor: Record<number, number> = {};
  const posByNat: Record<number, number> = {};
  const posByCig: Record<number, number> = {};
  const posByDrink: Record<number, number> = {};
  const posByPet: Record<number, number> = {};

  for (const h of houses) {
    posByColor[h.color] = h.houseNumber;
    posByNat[h.nationality] = h.houseNumber;
    posByCig[h.cigarettes] = h.houseNumber;
    posByDrink[h.drink] = h.houseNumber;
    posByPet[h.pet] = h.houseNumber;
  }

  return { posByColor, posByNat, posByCig, posByDrink, posByPet };
}

describe('Zebra solver (invariants)', () => {
  let houses: House[];
  let m: ReturnType<typeof maps>;

  beforeAll(() => {
    houses = solveZebra(rules);
    m = maps(houses);
  });

  it('returns five houses 1..5 (unique positions)', () => {
    expect(houses).toHaveLength(5);
    expect(uniq(houses.map(h => h.houseNumber))).toBe(true);
    // sorted or not, ensure positions are exactly 1..5
    expect(new Set(houses.map(h => h.houseNumber))).toEqual(
      new Set([1, 2, 3, 4, 5])
    );
  });

  it('assigns each attribute bijectively (no duplicates per dimension)', () => {
    expect(uniq(houses.map(h => h.color))).toBe(true);
    expect(uniq(houses.map(h => h.nationality))).toBe(true);
    expect(uniq(houses.map(h => h.cigarettes))).toBe(true);
    expect(uniq(houses.map(h => h.drink))).toBe(true);
    expect(uniq(houses.map(h => h.pet))).toBe(true);
  });

  // Anchors
  it('milk is drunk in the middle house; Norwegian lives in the first house', () => {
    expect(m.posByDrink[Drinks.Milk]).toBe(3);
    expect(m.posByNat[Nationality.Norwegian]).toBe(1);
  });

  // Simple pairwise equivalences
  it('Englishman ↔ Red, Spaniard ↔ Dog, Coffee ↔ Green, Ukrainian ↔ Tea', () => {
    expect(m.posByNat[Nationality.Englishman]).toBe(m.posByColor[Colors.Red]);
    expect(m.posByNat[Nationality.Spaniard]).toBe(m.posByPet[Pets.Dog]);
    expect(m.posByDrink[Drinks.Coffee]).toBe(m.posByColor[Colors.Green]);
    expect(m.posByNat[Nationality.Ukrainian]).toBe(m.posByDrink[Drinks.Tea]);
  });

  it('Old Gold ↔ Snails, Kools ↔ Yellow, Lucky Strike ↔ Orange Juice, Japanese ↔ Parliaments', () => {
    expect(m.posByCig[Cigarettes.OldGold]).toBe(m.posByPet[Pets.Snail]);
    expect(m.posByCig[Cigarettes.Kools]).toBe(m.posByColor[Colors.Yellow]);
    expect(m.posByCig[Cigarettes.LuckyStrike]).toBe(
      m.posByDrink[Drinks.OrangeJuice]
    );
    expect(m.posByNat[Nationality.Japanese]).toBe(
      m.posByCig[Cigarettes.Parliaments]
    );
  });

  // Relational constraints
  it('Green is immediately to the right of Ivory', () => {
    const diff = m.posByColor[Colors.Green] - m.posByColor[Colors.Ivory];
    expect(diff).toBe(1);
  });

  it('Chesterfields is next to Fox; Kools is next to Horse; Norwegian lives next to Blue', () => {
    expect(
      Math.abs(m.posByCig[Cigarettes.Chesterfields] - m.posByPet[Pets.Fox])
    ).toBe(1);
    expect(
      Math.abs(m.posByCig[Cigarettes.Kools] - m.posByPet[Pets.Horse])
    ).toBe(1);
    expect(
      Math.abs(m.posByNat[Nationality.Norwegian] - m.posByColor[Colors.Blue])
    ).toBe(1);
  });

  // Classic final answers (adjust if you use a variant set of clues)
  it('answers the riddle: who drinks water? who owns the zebra?', () => {
    const waterPos = m.posByDrink[Drinks.Water];
    const zebraPos = m.posByPet[Pets.Zebra];
    const whoDrinksWater = houses.find(
      h => h.houseNumber === waterPos
    )!.nationality;
    const whoOwnsZebra = houses.find(
      h => h.houseNumber === zebraPos
    )!.nationality;

    // Canonical for the classic set:
    expect(whoDrinksWater).toBe(Nationality.Norwegian);
    expect(whoOwnsZebra).toBe(Nationality.Japanese);
  });
});

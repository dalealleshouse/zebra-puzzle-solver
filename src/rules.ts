import { House } from './house';
import { Cigarettes, Colors, Drinks, Nationalities, Pets } from './variables';

export type Rule = (house: House, allHouses: House[]) => boolean;

type PartialPair = Partial<
  Pick<
    House,
    'houseNumber' | 'color' | 'nationality' | 'cigarettes' | 'drink' | 'pet'
  >
>;

export const standardRule = (vh: PartialPair): Rule => {
  const keys = Object.keys(vh) as (keyof House)[];
  if (keys.length !== 2)
    throw new Error('standardRule expects exactly two keys');

  const [k1, k2] = keys;
  const v1 = vh[k1]!;
  const v2 = vh[k2]!;

  return (house: House) => {
    const m1 = house[k1] === v1;
    const m2 = house[k2] === v2;
    return (m1 && m2) || (!m1 && !m2);
  };
};

/* -------------------- Relational rules (partial-friendly) -------------------- */

// “Green is immediately to the right of Ivory.”
export const greenHouseRightOfIvoryHouse: Rule = (house, all) => {
  if (house.color !== Colors.Green && house.color !== Colors.Ivory) return true;

  if (house.color === Colors.Green) {
    if (house.houseNumber === 1) return false; // can't have ivory to the left
    const left = all.find(h => h.houseNumber === house.houseNumber - 1);
    if (!left) return true; // neighbor not placed yet → defer
    return left.color === Colors.Ivory; // must be ivory to the left
  }

  // house is Ivory
  if (house.houseNumber === 5) return false; // can't have green to the right
  const right = all.find(h => h.houseNumber === house.houseNumber + 1);
  if (!right) return true; // neighbor not placed yet → defer
  return right.color === Colors.Green; // must be green to the right
};

// “A next to B” where A/B are two attributes on adjacent houses.
// Partial-friendly: only fail when it’s impossible given the placed neighbors.
export const nextToRule = (vh: PartialPair): Rule => {
  const keys = Object.keys(vh) as (keyof House)[];
  if (keys.length !== 2) throw new Error('nextToRule expects exactly two keys');

  const [k1, k2] = keys;
  const v1 = vh[k1]!;
  const v2 = vh[k2]!;

  return (house, all) => {
    const isK1 = house[k1] === v1;
    const isK2 = house[k2] === v2;
    if (!isK1 && !isK2) return true; // this house isn't involved

    const left = all.find(h => h.houseNumber === house.houseNumber - 1);
    const right = all.find(h => h.houseNumber === house.houseNumber + 1);

    // Helper to evaluate impossibility given currently placed neighbors
    const mustMatch = (
      neighbor: House | undefined,
      expectedKey: keyof House,
      expectedVal: unknown
    ) => (neighbor ? neighbor[expectedKey] === expectedVal : undefined); // undefined = not yet known

    if (isK1) {
      const leftOk = mustMatch(left, k2, v2);
      const rightOk = mustMatch(right, k2, v2);

      if (house.houseNumber === 1) {
        // Only right neighbor exists
        if (rightOk === undefined) return true;
        return rightOk;
      } else if (house.houseNumber === 5) {
        // Only left neighbor exists
        if (leftOk === undefined) return true;
        return leftOk;
      } else {
        // Middle: if both neighbors are placed and neither matches → impossible
        if (leftOk !== undefined && rightOk !== undefined)
          return leftOk || rightOk;
        return true; // at least one neighbor not placed → defer
      }
    }

    if (isK2) {
      const leftOk = mustMatch(left, k1, v1);
      const rightOk = mustMatch(right, k1, v1);

      if (house.houseNumber === 1) {
        if (rightOk === undefined) return true;
        return rightOk;
      } else if (house.houseNumber === 5) {
        if (leftOk === undefined) return true;
        return leftOk;
      } else {
        if (leftOk !== undefined && rightOk !== undefined)
          return leftOk || rightOk;
        return true;
      }
    }

    return true;
  };
};

/* -------------------- Classic Zebra ruleset -------------------- */

const englishmanLivesInRedHouse = standardRule({
  nationality: Nationalities.Englishman,
  color: Colors.Red,
});

const spaniardOwnsDog = standardRule({
  nationality: Nationalities.Spaniard,
  pet: Pets.Dog,
});

const coffeeInGreenHouse = standardRule({
  drink: Drinks.Coffee,
  color: Colors.Green,
});

const ukrainianDrinksTea = standardRule({
  nationality: Nationalities.Ukrainian,
  drink: Drinks.Tea,
});

const oldGoldOwnsSnails = standardRule({
  cigarettes: Cigarettes.OldGold,
  pet: Pets.Snail,
});

const koolsInYellowHouse = standardRule({
  cigarettes: Cigarettes.Kools,
  color: Colors.Yellow,
});

const milkInMiddleHouse = standardRule({
  drink: Drinks.Milk,
  houseNumber: 3,
});

const norwegianInFirstHouse = standardRule({
  nationality: Nationalities.Norwegian,
  houseNumber: 1,
});

const luckyStrikeDrinksOrangeJuice = standardRule({
  cigarettes: Cigarettes.LuckyStrike,
  drink: Drinks.OrangeJuice,
});

const japaneseSmokesParliament = standardRule({
  nationality: Nationalities.Japanese,
  cigarettes: Cigarettes.Parliaments,
});

const chesterfieldNextToFox = nextToRule({
  cigarettes: Cigarettes.Chesterfields,
  pet: Pets.Fox,
});

const koolNextToHorse = nextToRule({
  cigarettes: Cigarettes.Kools,
  pet: Pets.Horse,
});

const norwegianNextToBlue = nextToRule({
  nationality: Nationalities.Norwegian,
  color: Colors.Blue,
});

export const rules: Rule[] = [
  englishmanLivesInRedHouse,
  spaniardOwnsDog,
  coffeeInGreenHouse,
  ukrainianDrinksTea,
  oldGoldOwnsSnails,
  koolsInYellowHouse,
  milkInMiddleHouse,
  norwegianInFirstHouse,
  luckyStrikeDrinksOrangeJuice,
  japaneseSmokesParliament,
  greenHouseRightOfIvoryHouse,
  chesterfieldNextToFox,
  koolNextToHorse,
  norwegianNextToBlue,
];

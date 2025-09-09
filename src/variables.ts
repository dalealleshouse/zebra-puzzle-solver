export type HouseNumber = 1 | 2 | 3 | 4 | 5;

export type Brand<T extends string, B extends string> = T & {
  readonly __brand: B;
};
const brand = <B extends string>(v: string) => v as Brand<string, B>;

/* Colors */
export const Colors = {
  Red: brand<'Color'>('red'),
  Green: brand<'Color'>('green'),
  Blue: brand<'Color'>('blue'),
  Ivory: brand<'Color'>('ivory'),
  Yellow: brand<'Color'>('yellow'),
} as const;
export type Color = (typeof Colors)[keyof typeof Colors];
export const COLORS: readonly Color[] = [
  Colors.Red,
  Colors.Green,
  Colors.Blue,
  Colors.Ivory,
  Colors.Yellow,
] as const;

/* Nationalities */
export const Nationalities = {
  Englishman: brand<'Nationality'>('englishman'),
  Spaniard: brand<'Nationality'>('spaniard'),
  Ukrainian: brand<'Nationality'>('ukrainian'),
  Norwegian: brand<'Nationality'>('norwegian'),
  Japanese: brand<'Nationality'>('japanese'),
} as const;
export type Nationality = (typeof Nationalities)[keyof typeof Nationalities];
export const NATIONALITIES: readonly Nationality[] = [
  Nationalities.Englishman,
  Nationalities.Spaniard,
  Nationalities.Ukrainian,
  Nationalities.Norwegian,
  Nationalities.Japanese,
] as const;

/* Cigarettes */
export const Cigarettes = {
  OldGold: brand<'Cigarette'>('old gold'),
  Kools: brand<'Cigarette'>('kools'),
  Chesterfields: brand<'Cigarette'>('chesterfields'),
  LuckyStrike: brand<'Cigarette'>('lucky strike'),
  Parliaments: brand<'Cigarette'>('parliaments'),
} as const;
export type Cigarette = (typeof Cigarettes)[keyof typeof Cigarettes];
export const CIGARETTES: readonly Cigarette[] = [
  Cigarettes.OldGold,
  Cigarettes.Kools,
  Cigarettes.Chesterfields,
  Cigarettes.LuckyStrike,
  Cigarettes.Parliaments,
] as const;

/* Drinks */
export const Drinks = {
  Coffee: brand<'Drink'>('coffee'),
  Tea: brand<'Drink'>('tea'),
  Milk: brand<'Drink'>('milk'),
  OrangeJuice: brand<'Drink'>('orange juice'),
  Water: brand<'Drink'>('water'),
} as const;
export type Drink = (typeof Drinks)[keyof typeof Drinks];
export const DRINKS: readonly Drink[] = [
  Drinks.Coffee,
  Drinks.Tea,
  Drinks.Milk,
  Drinks.OrangeJuice,
  Drinks.Water,
] as const;

/* Pets */
export const Pets = {
  Dog: brand<'Pet'>('dog'),
  Snail: brand<'Pet'>('snail'),
  Fox: brand<'Pet'>('fox'),
  Horse: brand<'Pet'>('horse'),
  Zebra: brand<'Pet'>('zebra'),
} as const;
export type Pet = (typeof Pets)[keyof typeof Pets];
export const PETS: readonly Pet[] = [
  Pets.Dog,
  Pets.Snail,
  Pets.Fox,
  Pets.Horse,
  Pets.Zebra,
] as const;

// export enum Colors {
//   Invalid,
//   Red,
//   Green,
//   Blue,
//   Ivory,
//   Yellow,
// }
//
// export enum Nationality {
//   Invalid,
//   Englishman,
//   Spaniard,
//   Ukrainian,
//   Norwegian,
//   Japanese,
// }
//
// export enum Cigarettes {
//   Invalid,
//   OldGold,
//   Kools,
//   Chesterfields,
//   LuckyStrike,
//   Parliaments,
// }
//
// export enum Drinks {
//   Invalid,
//   Coffee,
//   Tea,
//   Milk,
//   OrangeJuice,
//   Water,
// }
//
// export enum Pets {
//   Invalid,
//   Dog,
//   Snail,
//   Fox,
//   Horse,
//   Zebra,
// }

import { Cigarette, Color, Drink, HouseNumber, Nationality, Pet } from '.';

export class House {
  constructor(
    public readonly houseNumber: HouseNumber,
    public readonly color: Color,
    public readonly nationality: Nationality,
    public readonly cigarettes: Cigarette,
    public readonly drink: Drink,
    public readonly pet: Pet
  ) {}
}

type HouseState = {
  houseNumber: HouseNumber;
  color: Color;
  nationality: Nationality;
  cigarettes: Cigarette;
  drink: Drink;
  pet: Pet;
};

type Draft = Partial<HouseState>;

function isComplete(d: Draft): d is HouseState {
  return (
    d.houseNumber !== undefined &&
    d.color !== undefined &&
    d.nationality !== undefined &&
    d.cigarettes !== undefined &&
    d.drink !== undefined &&
    d.pet !== undefined
  );
}

export class HouseBuilder {
  private readonly draft: Draft;

  constructor(draft: Draft = {}) {
    this.draft = draft;
  }

  houseNumber(houseNumber: HouseNumber) {
    return new HouseBuilder({ ...this.draft, houseNumber });
  }
  color(color: Color) {
    return new HouseBuilder({ ...this.draft, color });
  }
  nationality(n: Nationality) {
    return new HouseBuilder({ ...this.draft, nationality: n });
  }
  cigarettes(c: Cigarette) {
    return new HouseBuilder({ ...this.draft, cigarettes: c });
  }
  drink(d: Drink) {
    return new HouseBuilder({ ...this.draft, drink: d });
  }
  pet(p: Pet) {
    return new HouseBuilder({ ...this.draft, pet: p });
  }

  build(): House {
    if (!isComplete(this.draft))
      throw new Error('HouseBuilder: incomplete house');
    const s = this.draft;
    return new House(
      s.houseNumber,
      s.color,
      s.nationality,
      s.cigarettes,
      s.drink,
      s.pet
    );
  }

  static start(pos: HouseNumber) {
    return new HouseBuilder({ houseNumber: pos });
  }
}

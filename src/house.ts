import * as vars from './variables';

export class House {
  constructor(
    public readonly houseNumber: number,
    public readonly color: vars.Colors,
    public readonly nationality: vars.Nationality,
    public readonly cigarettes: vars.Cigarettes,
    public readonly drink: vars.Drinks,
    public readonly pet: vars.Pets
  ) {}
}

type HouseState = {
  houseNumber: number;
  color: vars.Colors;
  nationality: vars.Nationality;
  cigarettes: vars.Cigarettes;
  drink: vars.Drinks;
  pet: vars.Pets;
};

const NULL_INIT: HouseState = {
  houseNumber: 0,
  color: vars.Colors.Invalid,
  nationality: vars.Nationality.Invalid,
  cigarettes: vars.Cigarettes.Invalid,
  drink: vars.Drinks.Invalid,
  pet: vars.Pets.Invalid,
};

export const nullHouse = new House(
  NULL_INIT.houseNumber,
  NULL_INIT.color,
  NULL_INIT.nationality,
  NULL_INIT.cigarettes,
  NULL_INIT.drink,
  NULL_INIT.pet
);

export class HouseBuilder {
  private readonly state: House;

  constructor(init?: Partial<House>) {
    this.state = { ...NULL_INIT, ...init };
  }

  public houseNumber(houseNumber: number): HouseBuilder {
    return new HouseBuilder({ ...this.state, houseNumber });
  }
  public color(color: vars.Colors): HouseBuilder {
    return new HouseBuilder({ ...this.state, color });
  }
  public nationality(nationality: vars.Nationality): HouseBuilder {
    return new HouseBuilder({ ...this.state, nationality });
  }
  public cigarettes(cigarettes: vars.Cigarettes): HouseBuilder {
    return new HouseBuilder({ ...this.state, cigarettes });
  }
  public drink(drink: vars.Drinks): HouseBuilder {
    return new HouseBuilder({ ...this.state, drink });
  }
  public pet(pet: vars.Pets): HouseBuilder {
    return new HouseBuilder({ ...this.state, pet });
  }

  public build(): House {
    const s = this.state;
    return new House(
      s.houseNumber,
      s.color,
      s.nationality,
      s.cigarettes,
      s.drink,
      s.pet
    );
  }
}

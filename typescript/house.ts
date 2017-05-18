import * as vars from './variables';

export class House {
    constructor(
        public readonly houseNumber: number,
        public readonly color: vars.Colors,
        public readonly nationality: vars.Nationality,
        public readonly cigerets: vars.Cigarets,
        public readonly drink: vars.Drinks,
        public readonly pet: vars.Pets){}
};

export const nullHouse = new House(
    0,
    vars.Colors.Invalid,
    vars.Nationality.Invalid,
    vars.Cigarets.Invalid,
    vars.Drinks.Invalid,
    vars.Pets.Invalid
);

export class HouseBuilder {
    constructor(private readonly _house: House = nullHouse) { }

    public houseNumber(houseNumber: number) : HouseBuilder {
        return new HouseBuilder({...this._house, houseNumber: houseNumber});
    }

    public color(color: vars.Colors): HouseBuilder {
        return new HouseBuilder({...this._house, color: color});
    }

    public nationality(nationality: vars.Nationality): HouseBuilder {
        return new HouseBuilder({...this._house, nationality: nationality});
    }

    public cigerets(cigerets: vars.Cigarets): HouseBuilder {
        return new HouseBuilder({...this._house, cigerets: cigerets});
    }

    public drink(drink: vars.Drinks): HouseBuilder {
        return new HouseBuilder({...this._house, drink: drink});
    }

    public pet(pet: vars.Pets): HouseBuilder {
        return new HouseBuilder({...this._house, pet: pet});
    }

    public build(): House {
        return this._house;
    }
}

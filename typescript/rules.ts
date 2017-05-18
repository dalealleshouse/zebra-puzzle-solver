import * as vars from './variables';
import { House } from './house';

export type rule = (house: House, allHouses?: House[]) => boolean;

type partialHouse = {
    houseNumber?: number,
    color?: vars.Colors,
    nationality?: vars.Nationality,
    cigerets?: vars.Cigarets,
    drink?: vars.Drinks,
    pet?: vars.Pets
};

export const standardRule = (vh: partialHouse): rule => {
    const key1 = Object.keys(vh)[0];
    const key2 = Object.keys(vh)[1];

    return (house: House) =>
        (house[key1] !== vh[key1] && house[key2] !== vh[key2]) ||
            house[key1] === vh[key1] &&
            house[key2] === vh[key2]
}

const englishmanLivesInRedHouse = standardRule({ nationality: vars.Nationality.Englishman, color: vars.Colors.Red });

const spaniardOwnsDog = standardRule({ nationality: vars.Nationality.Spaniard, pet: vars.Pets.Dog });

const coffeeInGreeHouse = standardRule({ drink: vars.Drinks.Coffee, color: vars.Colors.Green });

const ukrainianDrinksTea = standardRule({ nationality: vars.Nationality.Ukrainian, drink: vars.Drinks.Tea } );

const oldGoldOwnsSnails = standardRule({ cigerets: vars.Cigarets.OldGold, pet: vars.Pets.Snail });

const koolsInYellowHouse = standardRule({ cigerets: vars.Cigarets.Kool, color: vars.Colors.Yellow });

const milkInMiddleHouse = standardRule({ drink: vars.Drinks.Milk, houseNumber: 3 }); 

const norwegianInFirstHouse = standardRule({ nationality: vars.Nationality.Norwegian, houseNumber: 1 }); 

const luckyStrikeDrinksOrangeJuice = 
    standardRule({ cigerets: vars.Cigarets.LuckyStrike, drink: vars.Drinks.OrangeJuice });

const japaneseSmokesParliament =
    standardRule({ nationality: vars.Nationality.Japanese, cigerets: vars.Cigarets.Parliaments });

// No need to generic-ize this b/c this is the only "right of" rule
export const greenHouseRightOfIvoryHouse = (house: House, allHouses: House[]) => {
    if(house.color !== vars.Colors.Green && house.color !== vars.Colors.Ivory)
        return true;

    if((house.color === vars.Colors.Green && house.houseNumber === 1) ||
        (house.color === vars.Colors.Ivory && house.houseNumber === 5))
        return false;

    if(house.color === vars.Colors.Green && 
        !allHouses.find(h => h.color === vars.Colors.Ivory && h.houseNumber === house.houseNumber - 1))
        return false;

    if(house.color === vars.Colors.Ivory && 
        !allHouses.find(h => h.color === vars.Colors.Green && h.houseNumber === house.houseNumber + 1))
        return false;

    return true;
}

export const nextToRule = (vh: partialHouse): rule => {
    const key1 = Object.keys(vh)[0];
    const key2 = Object.keys(vh)[1];

    return (house: House, allHouses: House[]) => {
        if (house[key1] !== vh[key1] && house[key2] !== vh[key2])
            return true;

        if(house[key1] === vh[key1] &&
            !allHouses.find(h => h[key2] == vh[key2] && Math.abs(h.houseNumber - house.houseNumber) === 1))
            return false;

        if(house[key2] ===vh[key2] &&
            !allHouses.find(h => h[key1]==  vh[key1] && Math.abs(h.houseNumber - house.houseNumber)
                === 1))
            return false;

        return true;
    }
}

const chesterfieldNextToFox = nextToRule({ cigerets: vars.Cigarets.Chesterfield, pet: vars.Pets.Fox });

const koolNextToHorse = nextToRule({ cigerets: vars.Cigarets.Kool, pet: vars.Pets.Horse });

const norwegianNextToBlue = nextToRule({ nationality: vars.Nationality.Norwegian, color: vars.Colors.Blue });

export const rules = [englishmanLivesInRedHouse, spaniardOwnsDog, coffeeInGreeHouse, ukrainianDrinksTea,
    oldGoldOwnsSnails, koolsInYellowHouse, milkInMiddleHouse, norwegianInFirstHouse, luckyStrikeDrinksOrangeJuice,
    japaneseSmokesParliament, greenHouseRightOfIvoryHouse, chesterfieldNextToFox, koolNextToHorse,
    norwegianNextToBlue];

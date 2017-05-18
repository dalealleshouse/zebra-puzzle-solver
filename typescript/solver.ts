import * as vars from './variables';
import { House } from './house';
type rawHouse = [number, number, number, number, number, number];


const flatten = (arr: any[]) => [].concat.apply([], arr);

const product = (...sets: any[]) =>
    sets.reduce((acc, set) =>
        flatten(acc.map((x:any) => set.map((y:any) => [ ...x, y ]))),
        [[]]);

function allPossible(): rawHouse[] {
    const values = [1,2,3,4, 5];
    return product(values, values, values, values, values, values);
}

export const allPossibleHouses = ():House[] =>
    allPossible().map((house:rawHouse) => {
        return {
            houseNumber: house[0],
            color: house[1],
            nationality: house[2],
            cigerets: house[3],
            drink: house[4],
            pet: house[5]
        }
    });

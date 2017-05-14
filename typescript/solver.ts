import * as vars from './variables';

type rawHouse = [number, number, number, number, number, number];

export type house = {
	readonly houseNumber: number;
	readonly color: vars.Colors;
	readonly nationality: vars.Nationality;
	readonly cigerets: vars.Cigarets;
	readonly drink: vars.Drinks;
	readonly pet: vars.Pets;
}

const flatten = (arr: any[]) => [].concat.apply([], arr);

const product = (...sets: any[]) =>
	sets.reduce((acc, set) =>
		flatten(acc.map((x:any) => set.map((y:any) => [ ...x, y ]))),
		[[]]);

function allPossible(): rawHouse[] {
	const values = [0,1,2,3,4];
	return product(values, values, values, values, values, values);
}

export const allPossibleHouses = ():house[] =>
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


export function englishmanLivesInRedHouse(house: house) {
	return true;
}

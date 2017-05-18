import { expect } from 'chai';
import * as vars from './variables';
import { House, HouseBuilder, nullHouse } from './house';
import * as rules from './rules';

describe('standard rule should', () => {
    const standardRule = rules.standardRule({ nationality: vars.Nationality.Englishman, color: vars.Colors.Red });

    it('return true when house has specified properties', () => {
        const house = new HouseBuilder()
            .nationality(vars.Nationality.Englishman)
            .color(vars.Colors.Red)
            .build();

        const result = standardRule(house);
        expect(result).to.be.true;
    });

    it('return true when house has neither specified property', () => {
        const house = new HouseBuilder()
            .build();

        const result = standardRule(house);
        expect(result).to.be.true;
    });

    it('return false when house has only first specified property', () => {
        const house = new HouseBuilder()
            .nationality(vars.Nationality.Englishman)
            .build();

        const result = standardRule(house);
        expect(result).to.be.false;
    });

    it('return false when house has only the second specified property', () => {
        const house = new HouseBuilder()
            .color(vars.Colors.Red)
            .build();

        const result = standardRule(house);
        expect(result).to.be.false;
    });
});

describe('greenHouseRightOfIvoryHouse rules should', () => {
    const greenHouse = new HouseBuilder().color(vars.Colors.Green);
    const ivoryHouse = new HouseBuilder().color(vars.Colors.Ivory);
    const rule = rules.greenHouseRightOfIvoryHouse;

    it('return true when house is not green or ivory', () => {
        const result = rule(nullHouse, []);
        expect(result).to.be.true;
    });

    it('return false when green house with index of 1', () => {
        // It can't be 1 because that cannot be to the right of anything
        const result = rule(greenHouse.houseNumber(1).build(), []);
        expect(result).to.be.false;
    });

    it('return false when ivory house with index of 5', () => {
        // It can't be 5 because the ivory house is to the left of the green house
        const result = rule(ivoryHouse.houseNumber(5).build(), []);
        expect(result).to.be.false;
    });

    describe('return false', () => {
        it('when green and no ivory house with house position - 1', () => {
            const result = rule(greenHouse.houseNumber(2).build(), [ivoryHouse.houseNumber(3).build()]);
            expect(result).to.be.false;
        });

        it('when ivory and no ivory house with house position + 1', () => {
            const result = rule(ivoryHouse.houseNumber(3).build(), [greenHouse.houseNumber(2).build()]);
            expect(result).to.be.false;
        });
    });

    describe('return true', () => {
        it('when green and ivory house with house position + 1', () => {
            const result = rule(ivoryHouse.houseNumber(1).build(), [greenHouse.houseNumber(2).build()]);
            expect(result).to.be.true;
        });

        it('when ivory and green house with house position + 1', () => {
            const result = rule(greenHouse.houseNumber(2).build(), [ivoryHouse.houseNumber(1).build()]);
            expect(result).to.be.true;
        });
    });
});

describe('nextToRule should', () => {
    const chesterfieldHouse = new HouseBuilder().cigerets(vars.Cigarets.Chesterfield);
    const foxHouse = new HouseBuilder().pet(vars.Pets.Fox);
    const rule = rules.nextToRule({cigerets: vars.Cigarets.Chesterfield, pet: vars.Pets.Fox});

    it('return true when house is not chesterfield or fox', () => {
        const result = rule(nullHouse, []);
        expect(result).to.be.true;
    });

    describe('return false', () => {
        it('when chesterfield and no fox with house position +/- 1', () => {
            const result = rule(chesterfieldHouse.houseNumber(2).build(), [foxHouse.houseNumber(4).build()]);
            expect(result).to.be.false;
        });

        it('when fox and no chesterfield with house position + 1', () => {
            const result = rule(foxHouse.houseNumber(4).build(), [chesterfieldHouse.houseNumber(2).build()]);
            expect(result).to.be.false;
        });
    });

    describe('return true', () => {
        it('when chesterfield and fox house with house position +/- 1', () => {
            const result = rule(chesterfieldHouse.houseNumber(1).build(), [foxHouse.houseNumber(2).build()]);
            expect(result).to.be.true;

            const result2 = rule(chesterfieldHouse.houseNumber(2).build(), [foxHouse.houseNumber(1).build()]);
            expect(result2).to.be.true;
        });

        it('when fox and chesterfield house with house position + 1', () => {
            const result = rule(foxHouse.houseNumber(2).build(), [chesterfieldHouse.houseNumber(1).build()]);
            expect(result).to.be.true;

            const result2 = rule(chesterfieldHouse.houseNumber(2).build(), [foxHouse.houseNumber(3).build()]);
            expect(result2).to.be.true;
        });
    });
});

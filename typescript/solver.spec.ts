import { expect } from 'chai';
import { allPossibleHouses } from './solver';

describe('allPossibleHouses should', () => {
    it('create one item per possible combinations', () => {
        const result = allPossibleHouses();

        // Each house has 6 attributes with 5 possible values
        // 5^6 = 15625
        // There are 15625 possible house configurations
        expect(result.length).to.eq(15625);
    });

    it('generate unique results', () => {
        // Create a rudimentry hash string from each array object
        const hash = allPossibleHouses()
            .map(x => `${x.houseNumber}-${x.color}-${x.nationality}-${x.drink}-${x.cigerets}-${x.pet}`);

        // The hash is a primative, so Set with automatically remove duplicates
        const distinct = [...new Set(hash)];

        expect(distinct.length).to.eq(15625);
    });
});

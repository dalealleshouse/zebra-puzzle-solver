import { House, rules, solveZebra } from '../../.';
import { Cigarettes, Colors, Drinks, Nationality, Pets } from '../../variables';

describe('solver should', () => {
  it('should return known solution to problem', () => {
    const result = solveZebra(rules);

    expect(result).toEqual([
      new House(
        1,

        Colors.Yellow,
        Nationality.Norwegian,
        Cigarettes.Kools,
        Drinks.Water,
        Pets.Fox
      ),
    ]);
  });
});

import { rules, solveZebra } from '../../.';

describe('solver should', () => {
  it('should return known solution to problem', () => {
    const result = solveZebra(rules);

    expect(result).toEqual([]);
  });
});

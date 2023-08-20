import { _makePositions } from '../../src/utils';

describe('_makePositions', () => {
  it('Should return correct values', () => {
    const items = ['', '', '', ''];

    const width = 100;

    const positions = _makePositions(items, width);

    expect(positions).toStrictEqual([0, 100, 200, 300]);
  });
});

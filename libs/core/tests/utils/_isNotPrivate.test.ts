import { _isNotPrivate } from '../../src/utils';

describe('_isNOtPrivate', () => {
  it("Should returns true if value not starts with '_'", () => {
    const isNotPrivate = _isNotPrivate('any_property');

    expect(isNotPrivate).toBe(true);
  });

  it("Should returns false if value starts with '_'", () => {
    const isNotPrivate = _isNotPrivate('_any_private_property');

    expect(isNotPrivate).toBe(false);
  });
});

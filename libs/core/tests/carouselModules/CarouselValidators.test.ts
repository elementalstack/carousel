import { ICarouselState } from '../../src';
import { CarouselValidators } from '../../src/carouselModules';

class CarouselStateStub implements ICarouselState {
  positions: number[] = [];
  currentIndex = 0;

  constructor(positions: number[] = []) {
    this.positions = positions;
  }
}

function makeSut(positions: number[] = []) {
  const sut = new CarouselValidators(new CarouselStateStub(positions));

  return { sut };
}

describe('CarouselValidators', () => {
  describe('validateIndex', () => {
    it('Should be true if index exist in carouselState.positions', () => {
      const positions = [100, 200, 300, 400];

      const { sut } = makeSut([...positions]);

      expect(sut.validateIndex(0)).toBe(true);
      expect(sut.validateIndex(1)).toBe(true);
      expect(sut.validateIndex(2)).toBe(true);
      expect(sut.validateIndex(3)).toBe(true);
    });

    it('Should be false if index not exist in carouselState.positions', () => {
      const positions = [100, 200];

      const { sut } = makeSut([...positions]);

      expect(sut.validateIndex(-1)).toBe(false);
      expect(sut.validateIndex(2)).toBe(false);
    });
  });
});

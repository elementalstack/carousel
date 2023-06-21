import { CarouselState } from '../../src/carouselModules';

function makeSut(positions: number[] = [200, 400, 600]) {
  const sut = new CarouselState(positions);

  return { sut };
}

describe('CarouselState', () => {
  describe('positions', () => {
    it('Should initialize with the value passed in constructor', () => {
      const positions = [100, 200, 300];

      const { sut } = makeSut([...positions]);

      expect(sut.positions).toEqual(positions);
    });
  });
});

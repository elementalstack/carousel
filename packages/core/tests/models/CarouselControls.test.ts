import CarouselControls from '../../src/models/CarouselControls';
import { ICarouselState } from '../../src/models/CarouselState';

class CarouselStateStub implements ICarouselState {
  positions = [];
  currentIndex = 0;
}

function makeSut() {
  const carouselStateStub = new CarouselStateStub();

  const sut = new CarouselControls(carouselStateStub);

  return { sut, state: carouselStateStub };
}

describe('CarouselControls', () => {
  describe('goToIndex', () => {
    it('Should go to given index', () => {
      const indexToGo = 10;

      const { sut, state } = makeSut();

      sut.goToIndex(indexToGo);

      expect(state.currentIndex).toBe(indexToGo);
    });
  });

  describe('goToNextIndex', () => {
    it('Should go to next index', () => {
      const { sut, state } = makeSut();

      sut.goToNextItem();

      expect(state.currentIndex).toBe(1);
    });
  });

  describe('goToPrevItem', () => {
    it('Should go to previous index', () => {
      const { sut, state } = makeSut();

      sut.goToPrevItem();

      expect(state.currentIndex).toBe(-1);
    });
  });

  describe('Integration tests', () => {
    it('Should update currentIndex correctly', () => {
      const { sut, state } = makeSut();

      sut.goToNextItem();
      expect(state.currentIndex).toBe(1);

      sut.goToPrevItem();
      expect(state.currentIndex).toBe(0);

      sut.goToIndex(2);
      expect(state.currentIndex).toBe(2);

      sut.goToNextItem();
      expect(state.currentIndex).toBe(3);

      sut.goToPrevItem();
      expect(state.currentIndex).toBe(2);
    });
  });
});

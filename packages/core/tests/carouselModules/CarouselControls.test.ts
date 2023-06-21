import { vi } from 'vitest';
import { ICarouselState, ICarouselValidators } from '../../src';
import { CarouselControls } from '../../src/carouselModules';

class CarouselStateStub implements ICarouselState {
  positions = [];
  currentIndex = 0;
}

class CarouselValidatorsSpy implements ICarouselValidators {
  validateIndex = vi.fn(() => true);
}

function makeSut() {
  const carouselStateStub = new CarouselStateStub();

  const carouselValidatorsSpy = new CarouselValidatorsSpy();

  const sut = new CarouselControls(carouselStateStub, carouselValidatorsSpy);

  return { sut, state: carouselStateStub, validators: carouselValidatorsSpy };
}

describe('CarouselControls', () => {
  describe('goToIndex', () => {
    it('Should go to given index if validateIndex returns true', () => {
      const indexToGo = 10;

      const { sut, state } = makeSut();

      sut.goToIndex(indexToGo);

      expect(state.currentIndex).toBe(indexToGo);
    });

    it('Should not go to given index if validateIndex returns false', () => {
      const indexToGo = 10;

      const { sut, state, validators } = makeSut();

      const indexBeforeUpdate = state.currentIndex;

      validators.validateIndex.mockReturnValueOnce(false);

      sut.goToIndex(indexToGo);

      expect(state.currentIndex).not.toBe(indexToGo);
      expect(state.currentIndex).toBe(indexBeforeUpdate);
    });
  });

  describe('goToNextIndex', () => {
    it('Should go to next index if validateIndex returns true', () => {
      const { sut, state } = makeSut();

      sut.goToNextItem();

      expect(state.currentIndex).toBe(1);
    });

    it('Should not go to next index if validateIndex returns false', () => {
      const { sut, state, validators } = makeSut();

      const indexBeforeUpdate = state.currentIndex;

      validators.validateIndex.mockReturnValueOnce(false);

      sut.goToNextItem();

      expect(state.currentIndex).toBe(indexBeforeUpdate);
    });
  });

  describe('goToPrevItem', () => {
    it('Should go to previous index if validateIndex returns true', () => {
      const { sut, state } = makeSut();

      sut.goToPrevItem();

      expect(state.currentIndex).toBe(-1);
    });

    it('Should not go to previous index if validateIndex returns false', () => {
      const { sut, state, validators } = makeSut();

      const indexBeforeUpdate = state.currentIndex;

      validators.validateIndex.mockReturnValueOnce(false);

      sut.goToPrevItem();

      expect(state.currentIndex).toBe(indexBeforeUpdate);
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

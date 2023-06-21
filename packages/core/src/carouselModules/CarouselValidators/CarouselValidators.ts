import { ICarouselState } from '../CarouselState';

export interface ICarouselValidators {
  validateIndex: (index: number) => boolean;
}

class CarouselValidators implements ICarouselValidators {
  private readonly _carouselState: ICarouselState;

  constructor(carouselState: ICarouselState) {
    this._carouselState = carouselState;
  }

  validateIndex(i: number) {
    if (i >= 0 && i <= this._carouselState.positions.length - 1) {
      return true;
    }

    return false;
  }
}

export default CarouselValidators;

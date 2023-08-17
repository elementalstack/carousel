import { ICarouselState } from '../CarouselState';
import { ICarouselValidators } from '../CarouselValidators';

export interface ICarouselControls {
  /**
   * Function to move for the next item to the list.
   */
  goToNextItem: () => void;
  /**
   * Function to move for the previous item to the list.
   */
  goToPrevItem: () => void;
  /**
   * Function to move for a specific item to the list.
   */
  goToIndex: (index: number) => void;
}

class CarouselControls implements ICarouselControls {
  private readonly _carouselState: ICarouselState;
  private readonly _carouselValidators: ICarouselValidators;

  constructor(
    carouselState: ICarouselState,
    carouselValidators: ICarouselValidators
  ) {
    this._carouselState = carouselState;
    this._carouselValidators = carouselValidators;
  }

  goToNextItem() {
    const nextIndex = this._carouselState.currentIndex + 1;

    if (this._carouselValidators.validateIndex(nextIndex)) {
      this._carouselState.currentIndex = nextIndex;
    }
  }

  goToPrevItem() {
    const prevIndex = this._carouselState.currentIndex - 1;

    if (this._carouselValidators.validateIndex(prevIndex)) {
      this._carouselState.currentIndex = prevIndex;
    }
  }

  goToIndex(index: number) {
    if (this._carouselValidators.validateIndex(index)) {
      this._carouselState.currentIndex = index;
    }
  }
}

export default CarouselControls;

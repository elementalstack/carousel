import { ICarouselState } from './CarouselState';

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

  constructor(carouselState: ICarouselState) {
    this._carouselState = carouselState;
  }

  goToNextItem() {
    this._carouselState.currentIndex++;
  }

  goToPrevItem() {
    this._carouselState.currentIndex--;
  }

  goToIndex(index: number) {
    this._carouselState.currentIndex = index;
  }
}

export default CarouselControls;

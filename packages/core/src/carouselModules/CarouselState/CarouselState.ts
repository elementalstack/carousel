export interface ICarouselState {
  positions: number[];
  currentIndex: number;
}

class CarouselState implements ICarouselState {
  currentIndex = 0;
  positions: number[];

  constructor(positions: number[]) {
    this.positions = positions;
  }
}

export default CarouselState;

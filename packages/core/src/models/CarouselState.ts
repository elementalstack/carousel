export interface ICarouselState {
  positions: number[];
  currentIndex: number;
}

class CarouselState implements ICarouselState {
  private _currentIndex = 0;
  private _positions: number[];

  constructor(positions: number[]) {
    this._positions = positions;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(i: number) {
    if (i >= 0 && i <= this._positions.length - 1) {
      this._currentIndex = i;
    }
  }

  get positions() {
    return this._positions;
  }

  set positions(positions: number[]) {
    this._positions = positions;
  }
}

export default CarouselState;

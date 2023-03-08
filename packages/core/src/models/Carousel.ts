import { isNotPrivate } from '../utils/isNotPrivate';
import CarouselControls, { ICarouselControls } from './CarouselControls';
import CarouselState, { ICarouselState } from './CarouselState';
import CarouselStyles, { ICarouselStyles } from './CarouselStyles';

export interface ITrackProps {
  width: number;
}

export interface ICarouselItem {
  /**
   * Function to rendering a React component.
   * @returns React.ReactNode
   */
  child: () => unknown;
}

export interface ICarousel {
  /**
   * Property to receive a items collection.
   */
  items: ICarouselItem[];
  controls: ICarouselControls;
  state: ICarouselState;
  styles: ICarouselStyles;
  trackProps: ITrackProps;
  /**
   * A event to observe carousel state updates.
   */
  onStateChange?: (state: ICarouselState) => void;
}

function _makePositions(items: ICarouselItem[], width: number) {
  return items.map((_, index) => width * index);
}

export class Carousel implements ICarousel {
  private _items: ICarouselItem[] = [];
  private readonly _carouselState: ICarouselState;
  private readonly _carouselControls: ICarouselControls;
  private readonly _carouselStyle: ICarouselStyles;

  onStateChange?: (state: ICarouselState) => void;

  trackProps: ITrackProps;

  constructor(items: ICarouselItem[], trackProps: ITrackProps) {
    this._items = items;

    this._carouselState = new Proxy(
      new CarouselState(_makePositions(items, trackProps.width)),
      {
        set: (target, property, value, receiver) => {
          const isAssigned = Reflect.set(target, property, value, receiver);

          if (isNotPrivate(property.toString())) {
            this.onStateChange?.(target);
          }

          return isAssigned;
        },
      }
    );

    this._carouselControls = new CarouselControls(this._carouselState);
    this._carouselStyle = new CarouselStyles(this._carouselState, trackProps);

    this.trackProps = trackProps;
  }

  get items() {
    return this._items;
  }

  get controls() {
    return this._carouselControls;
  }

  get state() {
    return this._carouselState;
  }

  get styles() {
    return this._carouselStyle;
  }
}

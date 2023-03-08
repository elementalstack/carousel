import {
  itemDefaultStyle,
  sliderDefaultStyle,
  trackDefaultStyle,
} from '../styles/default';
import { ITrackProps } from './Carousel';
import { ICarouselState } from './CarouselState';

export interface ISliderStyle {
  overflowX: 'hidden';
}

export interface ITrackStyle {
  display: 'flex';
  margin: 0;
  padding: 0;
  listStyle: 'none';
  transform: string;
  transition: string;
}

export interface IItemStyle {
  width: number;
  flexShrink: 0;
}

export interface ICarouselStyles {
  getSliderStyle: () => ISliderStyle;
  getTrackStyle: () => ITrackStyle;

  getItemStyle: () => IItemStyle;
}

class CarouselStyles implements ICarouselStyles {
  private readonly _carouselState: ICarouselState;
  private _trackProps: ITrackProps;

  constructor(carouselState: ICarouselState, trackProps: ITrackProps) {
    this._carouselState = carouselState;
    this._trackProps = trackProps;
  }

  getSliderStyle() {
    return sliderDefaultStyle;
  }

  getTrackStyle() {
    const { currentIndex, positions } = this._carouselState;

    return {
      ...trackDefaultStyle,
      transform: `translateX(-${positions[currentIndex]}px)`,
      transition: '500ms',
    };
  }

  getItemStyle() {
    const { width } = this._trackProps;

    return {
      ...itemDefaultStyle,
      width,
    };
  }
}

export default CarouselStyles;

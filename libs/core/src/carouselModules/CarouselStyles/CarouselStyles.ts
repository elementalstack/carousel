import { ITrackProps } from '../../types';
import { ICarouselState } from '../CarouselState';
import {
  itemDefaultStyle,
  sliderDefaultStyle,
  trackDefaultStyle,
} from './styles';

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
  private readonly _trackProps: ITrackProps;

  constructor(carouselState: ICarouselState, trackProps: ITrackProps) {
    this._carouselState = carouselState;
    this._trackProps = trackProps;
  }

  getSliderStyle() {
    return sliderDefaultStyle;
  }

  getTrackStyle() {
    const { currentIndex, positions } = this._carouselState;

    const position = positions[currentIndex] ?? 0;

    return {
      ...trackDefaultStyle,
      transform: `translateX(-${position}px)`,
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

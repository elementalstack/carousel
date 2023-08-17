import {
  ICarouselControls,
  ICarouselState,
  ICarouselStyles,
  ICarouselValidators,
} from './carouselModules';

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
  validators: ICarouselValidators;
  state: ICarouselState;
  styles: ICarouselStyles;
  trackProps: ITrackProps;
  /**
   * A event to observe carousel state updates.
   */
  onStateChange?: (state: ICarouselState) => void;
}

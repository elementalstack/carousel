import {
  CarouselControls,
  CarouselState,
  CarouselStyles,
  CarouselValidators,
} from './carouselModules';
import { CarouselCore } from './models';
import { ICarouselItem, ITrackProps } from './types';

export class Carousel extends CarouselCore {
  constructor(items: ICarouselItem[], trackProps: ITrackProps) {
    super(items, trackProps, {
      Controls: CarouselControls,
      State: CarouselState,
      Styles: CarouselStyles,
      Validators: CarouselValidators,
    });
  }
}

import { CarouselControls } from './CarouselControls';
import { CarouselState } from './CarouselState';
import { CarouselStyles } from './CarouselStyles';
import { CarouselValidators } from './CarouselValidators';

export interface ICarouselModules {
  Controls: typeof CarouselControls;
  State: typeof CarouselState;
  Styles: typeof CarouselStyles;
  Validators: typeof CarouselValidators;
}

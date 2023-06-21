import {
  ICarouselControls,
  ICarouselModules,
  ICarouselState,
  ICarouselStyles,
  ICarouselValidators,
} from '../carouselModules';
import { _isNotPrivate, _makePositions } from '../utils';
import { ICarousel, ICarouselItem, ITrackProps } from '../types';

class CarouselCore implements ICarousel {
  readonly items: ICarouselItem[] = [];
  readonly state: ICarouselState;
  readonly controls: ICarouselControls;
  readonly validators: ICarouselValidators;
  readonly styles: ICarouselStyles;

  onStateChange?: (state: ICarouselState) => void;

  trackProps: ITrackProps;

  constructor(
    items: ICarouselItem[],
    trackProps: ITrackProps,
    modules: ICarouselModules
  ) {
    const { Controls, State, Styles, Validators } = modules;

    this.items = items;
    this.trackProps = trackProps;

    this.state = new Proxy(new State(_makePositions(items, trackProps.width)), {
      set: (target, property, value, receiver) => {
        const isAssigned = Reflect.set(target, property, value, receiver);

        if (_isNotPrivate(property.toString())) {
          this.onStateChange?.(target);
        }

        return isAssigned;
      },
    });

    this.validators = new Validators(this.state);
    this.controls = new Controls(this.state, this.validators);
    this.styles = new Styles(this.state, trackProps);
  }
}

export default CarouselCore;

import { vi } from 'vitest';
import { Carousel, ICarouselItem, ITrackProps } from '../src';
import { CarouselCore } from '../src/models';
import {
  CarouselControls,
  CarouselState,
  CarouselStyles,
  CarouselValidators,
} from '../src/carouselModules';

vi.mock('../src/models');

function makeSut(
  items: ICarouselItem[] = [],
  trackProps: ITrackProps = { width: 0 }
) {
  return new Carousel(items, trackProps);
}

describe('Carousel', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Should call super class (CarouselCore) with correct parameters', () => {
    const items = [
      { child: () => '' },
      { child: () => '' },
      { child: () => '' },
    ];

    const trackProps = { width: 150 };

    makeSut([...items], { ...trackProps });

    expect(CarouselCore).toHaveBeenCalledWith(items, trackProps, {
      Controls: CarouselControls,
      State: CarouselState,
      Styles: CarouselStyles,
      Validators: CarouselValidators,
    });
  });
});

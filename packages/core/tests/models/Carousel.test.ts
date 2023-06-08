import { vi } from 'vitest';
import { Carousel, ICarouselItem, ITrackProps } from '../../src';
import CarouselState from '../../src/models/CarouselState';
import CarouselStyles from '../../src/models/CarouselStyles';

function makeSut(
  items: ICarouselItem[] = [],
  trackProps: ITrackProps = { width: 0 }
) {
  return new Carousel(items, trackProps);
}

vi.mock('../../src/models/CarouselState');
vi.mock('../../src/models/CarouselStyles');

describe('Carousel', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('State', () => {
    it('Should be instance of CarouselState', () => {
      const carousel = makeSut();

      expect(carousel.state).toBeInstanceOf(CarouselState);
    });

    it('Should instantiate CarouselState with correct arguments', () => {
      const items = [
        { child: () => '' },
        { child: () => '' },
        { child: () => '' },
      ];

      const width = 100;

      makeSut(items, { width });

      expect(CarouselState).toHaveBeenCalledWith([0, 100, 200]);
    });
  });

  describe('styles', () => {
    it('Should be instance of CarouselStyles', () => {
      const carousel = makeSut();

      expect(carousel.styles).toBeInstanceOf(CarouselStyles);
    });

    it('Should instantiate CarouselStyles with correct arguments', () => {
      const items = [{ child: () => '' }, { child: () => '' }];

      const trackProps = { width: 200 };

      const carousel = makeSut(items, trackProps);

      expect(CarouselStyles).toHaveBeenCalledWith(carousel.state, trackProps);
    });
  });
});

import { vi } from 'vitest';
import {
  Carousel,
  ICarouselItem,
  ITrackProps,
} from '../../src/models/Carousel';
import CarouselState from '../../src/models/CarouselState';

function makeSut(
  items: ICarouselItem[] = [],
  trackProps: ITrackProps = { width: 0 }
) {
  return new Carousel(items, trackProps);
}

vi.mock('../../src/models/CarouselState');

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
});

import { ITrackProps } from '../../src/models/Carousel';
import { ICarouselState } from '../../src/models/CarouselState';
import CarouselStyles from '../../src/models/CarouselStyles';

class CarouselStateStub implements ICarouselState {
  positions: number[] = [];
  currentIndex = 0;

  constructor(positions: number[] = []) {
    this.positions = positions;
  }
}

function makeSut(
  positions?: number[],
  trackProps: ITrackProps = { width: 300 }
) {
  const carouselStateMock = new CarouselStateStub(positions);

  const sut = new CarouselStyles(carouselStateMock, trackProps);

  return { sut, state: carouselStateMock };
}

describe('CarouselStyles', () => {
  describe('getSliderStyle', () => {
    it('Should return slider style correctly', () => {
      const { sut } = makeSut();

      const sliderStyle = sut.getSliderStyle();

      expect(sliderStyle).toEqual({ overflowX: 'hidden' });
    });
  });

  describe('getTrackStyle', () => {
    const defaultTrackStyle = {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      transition: 'transform 500ms',
    };

    it('Should return track style correctly', () => {
      const positions = [200, 400, 600];

      const { sut } = makeSut(positions);

      const trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-${positions[0]}px)`,
      });
    });

    it('Should return track style correctly if currentIndex change', () => {
      const positions = [200, 400, 600];

      const { sut, state } = makeSut(positions);

      let trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-${positions[0]}px)`,
      });

      const newCurrentIndex = 2;

      state.currentIndex = newCurrentIndex;

      trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-${positions[newCurrentIndex]}px)`,
      });
    });

    it('Should return track style correctly if positions change', () => {
      const positions = [200, 400, 600];

      const { sut, state } = makeSut(positions);

      let trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-${positions[0]}px)`,
      });

      const newPositions = [100, 200, 300];

      state.positions = newPositions;

      trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-${newPositions[0]}px)`,
      });
    });

    it('Should return a valid value in transform property if positions is empty', () => {
      const positions: number[] = [];

      const { sut } = makeSut(positions);

      const trackStyle = sut.getTrackStyle();

      expect(trackStyle).toEqual({
        ...defaultTrackStyle,
        transform: `translateX(-0px)`,
      });
    });
  });

  describe('getItemStyle', () => {
    it('Should return item style correctly', () => {
      const trackWidth = 200;

      const { sut } = makeSut([], { width: trackWidth });

      const itemStyle = sut.getItemStyle();

      expect(itemStyle).toEqual({ flexShrink: 0, width: trackWidth });
    });
  });
});

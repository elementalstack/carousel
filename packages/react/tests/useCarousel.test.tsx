import { sliderDefaultStyle, trackDefaultStyle } from '@elementalstack/core';
import { ICarouselItem, IUseCarouselReturn, useCarousel } from '../src';
import { act, render, screen } from '@testing-library/react';

interface ComponentProps {
  items: ICarouselItem[];
}

function makeSut(
  items: ICarouselItem[] = [{ child: () => <div>Item 1</div> }]
) {
  const sut: Record<string, unknown> = {};

  function Component({ items }: ComponentProps) {
    const carousel = useCarousel({
      items,
    });

    sut.getCarousel = () => carousel;

    const { track } = carousel;

    return <ul {...track.getProps()}></ul>;
  }
  render(<Component items={items} />);

  if ('getCarousel' in sut) {
    return {
      sut: sut as { getCarousel: () => IUseCarouselReturn },
    };
  }

  throw new Error('Carousel is not defined');
}

describe('useCarousel', () => {
  describe('slider', () => {
    describe('getProps', () => {
      it('Should return html slider props correctly', () => {
        const { getCarousel } = makeSut().sut;

        const { slider } = getCarousel();

        expect(slider.getProps()).toStrictEqual({ style: sliderDefaultStyle });
      });
    });
  });

  describe('track', () => {
    describe('getProps', () => {
      it('Should return html track props correctly', () => {
        const { getCarousel } = makeSut().sut;

        const { track } = getCarousel();

        expect(track.getProps()).toStrictEqual({
          ref: { current: screen.getByRole('list') },
          style: { ...trackDefaultStyle, transform: `translateX(-0px)` },
        });
      });

      it('Should return html track props correctly when state is updated', async () => {
        const { getCarousel } = makeSut().sut;

        const { track, setState } = getCarousel();

        expect(track.getProps()).toStrictEqual({
          ref: { current: screen.getByRole('list') },
          style: { ...trackDefaultStyle, transform: `translateX(-0px)` },
        });

        await act(() =>
          setState({ currentIndex: 1, positions: [300, 600, 900] })
        );

        expect(track.getProps()).toStrictEqual({
          ref: { current: screen.getByRole('list') },
          style: { ...trackDefaultStyle, transform: `translateX(-600px)` },
        });
      });
    });
  });

  describe('state', () => {
    it('Should return all properties and values correctly', () => {
      const { getCarousel } = makeSut([
        { child: () => <div>Item 1</div> },
        { child: () => <div>Item 2</div> },
      ]).sut;

      expect(getCarousel().state).toStrictEqual({
        currentIndex: 0,
        positions: [0, 0],
      });
    });
  });

  describe('setState', () => {
    it('Should update the state correctly using an object as parameter', async () => {
      const { sut } = makeSut([
        { child: () => <div>Item 1</div> },
        { child: () => <div>Item 2</div> },
      ]);

      const { state, setState } = sut.getCarousel();

      expect(state).toStrictEqual({
        currentIndex: 0,
        positions: [0, 0],
      });

      const newState = { currentIndex: 1, positions: [300, 600, 900] };

      await act(() => setState({ ...newState }));

      expect(sut.getCarousel().state).toStrictEqual(newState);
    });

    it('Should update the state correctly using a callback as parameter', async () => {
      const { sut } = makeSut([
        { child: () => <div>Item 1</div> },
        { child: () => <div>Item 2</div> },
      ]);

      const { state, setState } = sut.getCarousel();

      expect(state).toStrictEqual({
        currentIndex: 0,
        positions: [0, 0],
      });

      const newState = { currentIndex: 1, positions: [300, 600, 900] };

      await act(() =>
        setState((prevState) => {
          expect(prevState).toStrictEqual({ ...state });

          return { ...newState };
        })
      );

      expect(sut.getCarousel().state).toStrictEqual(newState);
    });
  });

  describe('triggers', () => {
    describe('goToNextItem', () => {
      it('Should go to next index correctly', async () => {
        const { sut } = makeSut([
          { child: () => <div>Item 1</div> },
          { child: () => <div>Item 2</div> },
          { child: () => <div>Item 3</div> },
        ]);

        const { state, triggers } = sut.getCarousel();

        expect(state).toStrictEqual({
          currentIndex: 0,
          positions: [0, 0, 0],
        });

        await act(() => {
          triggers.goToNextItem();
        });

        expect(sut.getCarousel().state).toStrictEqual({
          currentIndex: 1,
          positions: [0, 0, 0],
        });
      });

      it('Should not go to next item when next index is invalid', async () => {
        const { sut } = makeSut([{ child: () => <div>Item 1</div> }]);

        const { state, triggers } = sut.getCarousel();

        const expectedState = {
          currentIndex: 0,
          positions: [0],
        };

        expect(state).toStrictEqual(expectedState);

        await act(() => {
          triggers.goToNextItem();
        });

        expect(sut.getCarousel().state).toStrictEqual(expectedState);
      });
    });
    describe('goToPrevItem', () => {
      it('Should go to previous index correctly', async () => {
        const { sut } = makeSut([
          { child: () => <div>Item 1</div> },
          { child: () => <div>Item 2</div> },
        ]);

        const { setState } = sut.getCarousel();

        await act(() => {
          setState((prev) => ({ ...prev, currentIndex: 1 }));
        });

        const { state, triggers } = sut.getCarousel();

        expect(state).toStrictEqual({
          currentIndex: 1,
          positions: [0, 0],
        });

        await act(() => {
          triggers.goToPrevItem();
        });

        expect(sut.getCarousel().state).toStrictEqual({
          currentIndex: 0,
          positions: [0, 0],
        });
      });

      it('Should not go to previous item when previous index is invalid', async () => {
        const { sut } = makeSut([{ child: () => <div>Item 1</div> }]);

        const { state, triggers } = sut.getCarousel();

        const expectedState = {
          currentIndex: 0,
          positions: [0],
        };

        expect(state).toStrictEqual(expectedState);

        await act(() => {
          triggers.goToPrevItem();
        });

        expect(sut.getCarousel().state).toStrictEqual(expectedState);
      });
    });
    describe('goToIndex', () => {
      it('Should go to desired index correctly', async () => {
        const { sut } = makeSut([
          { child: () => <div>Item 1</div> },
          { child: () => <div>Item 2</div> },
        ]);

        const { state, triggers } = sut.getCarousel();

        expect(state).toStrictEqual({
          currentIndex: 0,
          positions: [0, 0],
        });

        await act(() => {
          triggers.goToIndex(1);
        });

        expect(sut.getCarousel().state).toStrictEqual({
          currentIndex: 1,
          positions: [0, 0],
        });
      });

      it('Should not go to desired index when desired index is invalid', async () => {
        const { sut } = makeSut([{ child: () => <div>Item 1</div> }]);

        const { state, triggers } = sut.getCarousel();

        const expectedState = {
          currentIndex: 0,
          positions: [0],
        };

        expect(state).toStrictEqual(expectedState);

        await act(() => {
          triggers.goToIndex(2);
        });

        expect(sut.getCarousel().state).toStrictEqual(expectedState);
      });
    });
  });

  describe('items', () => {
    describe('length', () => {
      it('Should be te same length of input items', () => {
        const { sut } = makeSut([
          { child: () => <div>Item 1</div> },
          { child: () => <div>Item 2</div> },
        ]);

        const { items } = sut.getCarousel();

        expect(items.length).toBe(2);
      });
    });
  });
});

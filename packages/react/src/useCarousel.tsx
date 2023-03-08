import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Carousel,
  ICarouselState,
  IItemStyle,
  ISliderStyle,
  ITrackStyle as ITrackStyleCore,
  sliderDefaultStyle,
  trackDefaultStyle,
} from '@elementalstack/core';

interface ICarouselItems {
  /**
   * Function to rendering a React component.
   * @returns React.ReactNode
   */
  child: () => ReactNode;
}

interface IUseCarousel {
  /**
   * Property to receive a items collection.
   */
  items: ICarouselItems[];
}

interface IReturnItem {
  /**
   * Property to define a unique identity for an item.
   */
  id: number;
  /**
   * Function to render a carousel child component
   * @returns React.ReactNode
   */
  child: () => ReactNode;
  getProps: () => {
    style: IItemStyle;
  };
}

interface ITrackStyle
  extends Omit<ITrackStyleCore, 'transition' | 'transform'> {
  transform?: string;
  transition?: string;
}

interface IUseCarouselReturn {
  /**
   * Property to return a processed items collections
   */
  items: IReturnItem[];
  slider: {
    getProps: () => {
      style: ISliderStyle;
    };
  };
  track: {
    getProps: <TRef extends HTMLElement>() => {
      ref: React.RefObject<TRef>;
      style: ITrackStyle;
    };
  };
  /**
   * Property to contains a state properties.
   */
  state: {
    /**
     * A index for the current focus rendered item.
     */
    currentIndex: number;
  };
  /**
   * Property to contain a control methods.
   */
  triggers: {
    /**
     * Function to move for the next item to the list.
     */
    goToNextItem: () => void;
    /**
     * Function to move for the previous item to the list.
     */
    goToPrevItem: () => void;
    /**
     * Function to move for a specific item to the list.
     */
    goToIndex: (index: number) => void;
  };
}

/**
 * `useCarousel` is a custom hook used to generate a carousel items props and methods to help a render the carousel.
 */
export function useCarousel(options: IUseCarousel): IUseCarouselReturn {
  const trackRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<Carousel | null>(null);

  const [data, setData] = useState<IReturnItem[]>([]);
  const [state, setState] = useState<ICarouselState>({} as ICarouselState);

  const triggers = {
    goToNextItem: () => carouselRef.current?.controls.goToNextItem(),
    goToPrevItem: () => carouselRef.current?.controls.goToPrevItem(),
    goToIndex: (index: number) =>
      carouselRef.current?.controls.goToIndex(index),
  };

  useLayoutEffect(() => {
    if (!carouselRef.current && trackRef.current) {
      carouselRef.current = new Carousel(options.items, {
        width: trackRef.current.clientWidth,
      });

      carouselRef.current.onStateChange = function (state) {
        setState({ ...state });
      };
    }
  }, [options.items]);

  useEffect(() => {
    const trackRefProps = trackRef.current;
    const carouselRefProps = carouselRef.current;

    if (!trackRefProps || !carouselRefProps) {
      return;
    }

    const newData = options.items.map((item, index) => {
      return {
        id: index,
        ...item,
        getProps: () => ({
          style: carouselRefProps.styles.getItemStyle(),
        }),
      };
    });

    setData(newData);
  }, [options.items]);

  function typedGetProps<TRef extends HTMLElement>() {
    return {
      ref: trackRef as React.RefObject<TRef>,
      style: carouselRef.current?.styles.getTrackStyle() ?? trackDefaultStyle,
    };
  }

  return {
    items: data,
    slider: {
      getProps: () => ({
        style:
          carouselRef.current?.styles.getSliderStyle() ?? sliderDefaultStyle,
      }),
    },
    track: { getProps: typedGetProps },
    state,
    triggers,
  };
}

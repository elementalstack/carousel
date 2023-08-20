import React, {
  ReactNode,
  SetStateAction,
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

export interface ICarouselItem {
  /**
   * Function to rendering a React component.
   * @returns React.ReactNode
   */
  child: () => ReactNode;
}

export interface IUseCarouselOptions {
  /**
   * Property to receive a items collection.
   */
  items: ICarouselItem[];
}

export interface IReturnItem {
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

export interface ITrackStyle
  extends Omit<ITrackStyleCore, 'transition' | 'transform'> {
  transform?: string;
  transition?: string;
}

export interface IUseCarouselReturn {
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
     * Index for the current focus rendered item.
     */
    currentIndex: number;
    /**
     * Array with the position of each item in track.
     */
    positions: number[];
  };
  setState: (value: SetStateAction<ICarouselState>) => void;
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

const INITIAL_STATE: ICarouselState = {
  currentIndex: 0,
  positions: [],
};

/**
 * `useCarousel` is a custom hook used to generate a carousel items props and methods to help a render the carousel.
 */
export function useCarousel(options: IUseCarouselOptions): IUseCarouselReturn {
  const trackRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<Carousel | null>(null);

  const [data, setData] = useState<IReturnItem[]>([]);
  const [state, setState] = useState<ICarouselState>(INITIAL_STATE);

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

      setState({ ...carouselRef.current.state });

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

  function getTrackProps<TRef extends HTMLElement>() {
    return {
      ref: trackRef as React.RefObject<TRef>,
      style: carouselRef.current?.styles.getTrackStyle() ?? trackDefaultStyle,
    };
  }

  function handleUpdateState(updater: SetStateAction<ICarouselState>) {
    const newState = typeof updater === 'function' ? updater(state) : updater;

    if (carouselRef.current) {
      for (const [key, value] of Object.entries(newState)) {
        if (key in carouselRef.current.state) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          carouselRef.current.state[key as keyof ICarouselState] = value;
        }
      }
    }
  }

  return {
    items: data,
    slider: {
      getProps: () => ({
        style:
          carouselRef.current?.styles.getSliderStyle() ?? sliderDefaultStyle,
      }),
    },
    track: { getProps: getTrackProps },
    state,
    setState: handleUpdateState,
    triggers,
  };
}

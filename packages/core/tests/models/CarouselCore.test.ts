import { vi } from 'vitest';
import { ICarouselItem, ITrackProps } from '../../src';
import { CarouselCore } from '../../src/models';
import { ICarouselModules, ICarouselState } from '../../src/carouselModules';

class CarouselStateStub implements ICarouselState {
  currentIndex = 0;
  positions = [];
}

interface MakeSutParams {
  items?: ICarouselItem[];
  trackProps?: ITrackProps;
  modules?: Partial<ICarouselModules>;
}

function makeSut(params?: MakeSutParams) {
  const { items = [], trackProps = { width: 0 }, modules = {} } = params ?? {};

  const carouselModules = {
    Controls: vi.fn(),
    State: vi.fn(),
    Styles: vi.fn(),
    Validators: vi.fn(),
    ...modules,
  };

  const sut = new CarouselCore(items, trackProps, carouselModules);

  return { sut, modules: carouselModules };
}

const states = [
  { name: 'currentIndex', initialValue: 5, newValue: 10 },
  {
    name: 'positions',
    initialValue: [50, 100, 150],
    newValue: [100, 200, 300],
  },
];

describe('CarouselCore', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('State', () => {
    it('Should be instance of CarouselState', () => {
      const { sut, modules } = makeSut();

      expect(sut.state).toBeInstanceOf(modules.State);
    });

    it('Should instantiate CarouselState with correct arguments', () => {
      const items = [
        { child: () => '' },
        { child: () => '' },
        { child: () => '' },
      ];

      const width = 100;

      const { modules } = makeSut({ items, trackProps: { width } });

      expect(modules.State).toHaveBeenCalledWith([0, 100, 200]);
    });
  });

  describe('styles', () => {
    it('Should be instance of CarouselStyles', () => {
      const { sut, modules } = makeSut();

      expect(sut.styles).toBeInstanceOf(modules.Styles);
    });

    it('Should instantiate CarouselStyles with correct arguments', () => {
      const trackProps = { width: 200 };

      const { modules } = makeSut({
        trackProps: {
          ...trackProps,
        },
      });

      expect(modules.Styles).toHaveBeenCalledWith(
        expect.any(modules.State),
        trackProps
      );
    });
  });

  describe('controls', () => {
    it('Should be instance of CarouselControls', () => {
      const { sut, modules } = makeSut();

      expect(sut.controls).toBeInstanceOf(modules.Controls);
    });

    it('Should instantiate CarouselControls with correct arguments', () => {
      const { modules } = makeSut();

      expect(modules.Controls).toHaveBeenCalledWith(
        expect.any(modules.State),
        expect.any(modules.Validators)
      );
    });
  });

  describe('validators', () => {
    it('Should be instance of CarouselValidators', () => {
      const { sut, modules } = makeSut();

      expect(sut.validators).toBeInstanceOf(modules.Validators);
    });

    it('Should instantiate CarouselValidators with correct arguments', () => {
      const { modules } = makeSut();

      expect(modules.Validators).toHaveBeenCalledWith(
        expect.any(modules.State)
      );
    });
  });

  describe('items', () => {
    it('Should be initiate with correct value', () => {
      const items = [{ child: () => '' }];

      const { sut } = makeSut({ items: [...items] });

      expect(sut.items).toStrictEqual(items);
    });
  });

  describe('trackProps', () => {
    it('Should be initiate with correct value', () => {
      const trackProps = {
        width: 800,
      };

      const { sut } = makeSut({ trackProps: { ...trackProps } });

      expect(sut.trackProps).toStrictEqual(trackProps);
    });
  });

  describe('onStateChange', () => {
    it.each(states)(
      'Should be called once with all state updated when $name change',
      ({ name, initialValue, newValue }) => {
        const { sut } = makeSut({ modules: { State: CarouselStateStub } });

        sut.state[name] = initialValue;

        sut.onStateChange = vi.fn();

        const oldState = { ...sut.state };

        sut.state[name] = newValue;

        expect(sut.onStateChange).toHaveBeenCalledTimes(1);
        expect(sut.onStateChange).toBeCalledWith({
          ...oldState,
          [name]: newValue,
        });
      }
    );
  });
});

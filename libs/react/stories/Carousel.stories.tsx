import { useCarousel } from '../src/useCarousel';

export default {
  title: 'Carousel',
  parameters: {},
};

const items = [
  {
    child: () => {
      return <img src="https://picsum.photos/200/300" alt="" />;
    },
  },
  {
    child: () => {
      return <img src="https://picsum.photos/200/300?" alt="" />;
    },
  },
  {
    child: () => {
      return <img src="https://picsum.photos/200/300?teste" alt="" />;
    },
  },
];

function Screen() {
  const carousel = useCarousel({
    items,
  });

  return (
    <>
      <div {...carousel.slider.getProps()}>
        <ul {...carousel.track.getProps()}>
          {carousel.items.map((item) => (
            <li key={item.id} {...item.getProps()}>
              {item.child()}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={carousel.triggers.goToPrevItem}>Prev</button>
      <button onClick={carousel.triggers.goToNextItem}>Next</button>
    </>
  );
}

export const Default = () => {
  return (
    <div>
      <h1>Simple Carousel</h1>
      <Screen />
    </div>
  );
};

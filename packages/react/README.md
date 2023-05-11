# @elementalstack/react

Core implementation package for the react library, using its hooks and tools

## Installation

Choose installation tool

```sh
npm i @elementalstack/react
```
```sh
yarn add @elementalstack/react
```
```sh
pnpm add @elementalstack/react
```

## Import 

```tsx
import { useCarousel } from '@elementalstack/react';
```

## Usage
```tsx
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
];

function YourCarouselComponent() {
  const carousel = useCarousel({
    items,
  });

  return (
    <div>
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
    </div>
  );
}
```

## Licence

This project is licensed under the terms of the
[MIT license](https://github.com/elementalstack/carousel/blob/main/LICENSE).

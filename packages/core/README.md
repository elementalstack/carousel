# @elementalstack/core

Package to concentrate all carousel logic

## Installation

Choose installation tool

```sh
npm i @elementalstack/core
```
```sh
yarn add @elementalstack/core
```
```sh
pnpm add @elementalstack/core
```
## Import

```ts
import { Carousel } from '@elementalstack/core';
```
## Usage

```ts
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

const carousel = new Carousel(items, {
  width: 800,
});
```

## Licence

This project is licensed under the terms of the
[MIT license](https://github.com/elementalstack/carousel/blob/main/LICENSE).

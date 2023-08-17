export function _makePositions(items: unknown[], width: number) {
  return items.map((_, index) => width * index);
}

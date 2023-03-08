export function isNotPrivate(prop: string) {
  return !prop.startsWith('_');
}

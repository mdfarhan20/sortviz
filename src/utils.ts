
export function getRandomValue (start: number, end: number): number {
  return (Math.floor((Math.random() * end)) + start);
}
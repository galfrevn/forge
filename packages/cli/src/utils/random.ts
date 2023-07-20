export const random = (...arr: any[]) => {
  arr = arr.flat(1);
  return arr[Math.floor(arr.length * Math.random())];
};

export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

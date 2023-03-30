export function mapOverObject<T extends object, U extends keyof T>(
  obj: T,
  callback: (accum: T, key: U) => T
): T {
  const newObj = Object.keys(obj).reduce<T>((accum, key) => {
    const keyErr = key as U;
    return callback(accum, keyErr);
  }, {} as T);
  return newObj;
}

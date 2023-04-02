export function mapOverObject<T extends object, U extends keyof T>(
  obj: T,
  callback: (accum: T, key: U) => T
): T {
  const newObj = Object.keys(obj).reduce<T>((accum, key) => {
    if (Object.getOwnPropertyNames(obj).includes(key)) {
      const keyErr = key as U;
      return callback(accum, keyErr);
    }
    throw new Error(`Object ${JSON.stringify(obj)} does not have key ${key}`);
  }, {} as T);
  return newObj;
}

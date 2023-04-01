import { describe, expect, it } from 'vitest';
import { mapOverObject } from '../utils/helpers';

/*
	mapOverObject makes a shallow copy of an object using its enumerable keys
	and modifies properties by provided callback one by one;
	works in TypeScript only if all properties have the same type
*/
describe('mapOverObject makes shallow copy of an object', () => {
  it('Does not mutate original object', () => {
    const original = {
      first: {
        a: 1,
        b: 2,
      },
      second: {
        a: 4,
        b: 5,
      },
    };

    const newObject = mapOverObject(original, (accum, key) => {
      accum[key] = original[key];
      return accum;
    });

    newObject.first.a = 23;

    expect(newObject.first).not.toStrictEqual(original);
  });
  it('applies callback', () => {
    const original = {
      first: 23,
      second: 30,
    };

    const newObject = mapOverObject(original, (accum, key) => {
      accum[key] = 2 * original[key];
      return accum;
    });

    newObject.first = 46;

    expect(newObject.first).not.toStrictEqual(original);
  });
});

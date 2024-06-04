# get-nested-value

This package safely returns the value at a requested path inside of an object. Best used on unpredictable deeply nested structures. Supports arrays as well.

```javascript
const complex = { a: { b: [{ c: { d: 'hello!' } }] } };
console.log(getNestedValue('a.b.0.c.d', complex));
// => 'hello!'
```

**Install**

```bash
npm install get-nested-value --save
# or
yarn add get-nested-value
```

## Example

```javascript
import getNestedValue from 'get-nested-value';

getNestedValue('some.path.to.key', object);
// or as an array of paths
getNestedValue(['some', 'path', 'to', 'key'], object);
// dealing with arrays in your object?
getNestedValue(['some', 'path', 'atIndex', 0, 'key'], object);
// dealing with arrays of arrays?
getNestedValue([0, 1, 2, 'key'], arrayOfArrays);
// see test.js for more examples if needed
```

## Notes

**Contract:**
```
getNestedValue(
    @path: {Array.<string|number>|String|Number},
    @object: {Object|Array}
) => Any, throws Error if @path is invalid
```

**Explained:**
- The `@path` must be a number or string, or an array of numbers/strings. (See examples above or `test.js`)
- The `@object` should be object or array. The specified paths need not exist obviously.
- If the `@path` exists in `@object`, then that value is returned. Whatever it might be.
- If `@path` does not exist, `undefined` is returned.
- An `Error` is thrown if `@path` is not valid.
  - You should also make sure the `@object` param is indeed an `Object` or `Array`. But this will not throw an Error.

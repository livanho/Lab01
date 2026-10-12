# Issue Log

## Issues

### Issue 1

- **Location:** `src/receipt.ts:12`
- **Issue:** Empty element in the `ITEMS` array
- **Explanation:** The standalone comma creates an `undefined` entry in the array. Code that expects every item to have a `name` and `price` can fail when it reaches this entry.
- **Suggested fix:** Remove the extra comma and ensure every array element is a valid item object.
- **Status:** Fixed

### Issue 2

- **Location:** `src/receipt.ts:17`
- **Issue:** Invalid object literal syntax
- **Explanation:** The new item uses `=` between property names and values. Object literals require colons, so the module cannot be parsed.
- **Suggested fix:** Use `{ name, price }` or `{ name: name, price: price }`.
- **Status:** Fixed

### Issue 3

- **Location:** `src/receipt.ts:22`
- **Issue:** Incorrect item lookup in `deleteItem`
- **Explanation:** `indexOf("name")` searches for the literal string `"name"`, not an item whose `name` property matches the function argument. The resulting index is also never used.
- **Suggested fix:** Use `findIndex` to compare each item's `name` with the requested name.
- **Status:** Fixed

### Issue 4

- **Location:** `src/receipt.ts:23`
- **Issue:** `deleteItem` always removes the last item
- **Explanation:** `pop()` removes the final array element regardless of the requested name. It can delete the wrong item or delete an item when no matching item exists.
- **Suggested fix:** Use `splice` with the matching index, and only remove an item when a match is found.
- **Status:** Fixed

### Issue 5

- **Location:** `src/receipt.ts:28`
- **Issue:** Invalid iteration in `total`
- **Explanation:** The `for...of` loop attempts to iterate over the number `3`, which is not iterable. It therefore cannot calculate a subtotal from the grocery items.
- **Suggested fix:** Iterate directly over `ITEMS`, or use a valid numeric index loop.
- **Status:** Fixed

### Issue 6

- **Location:** `src/receipt.ts:29`
- **Issue:** Missing and conflicting total accumulator
- **Explanation:** The code does not declare a numeric accumulator and attempts to assign to the exported `total` function. This prevents the subtotal from being calculated correctly.
- **Suggested fix:** Declare a local accumulator such as `let subtotal = 0`, then add each item's price to it and return the accumulator.
- **Status:** Fixed

### Issue 7

- **Location:** `src/receipt.ts:35`
- **Issue:** Incorrect or undefined tax calculation contract
- **Explanation:** The function adds the tax rate directly to the subtotal. A rate such as `0.06` normally represents 6 percent and should be applied as a multiplication. The code also depends on the broken `total` function.
- **Suggested fix:** Define whether `tax` returns the tax amount or the tax-inclusive total, then calculate it consistently. For a tax-inclusive total, use `subtotal * (1 + taxRate)`.
- **Status:** Fixed

### Issue 8

- **Location:** `src/receipt.ts:43`
- **Issue:** Receipt loop treats an item object as an array index
- **Explanation:** `for...of ITEMS` assigns each item object to `i`, but the code then uses `ITEMS[i]`. An object cannot be used as the intended numeric index.
- **Suggested fix:** Use the iterated item directly, such as `item.name` and `item.price`.
- **Status:** Fixed

### Issue 9

- **Location:** `src/receipt.ts:43`
- **Issue:** Item output uses literal interpolation text
- **Explanation:** The line uses single quotes, so `${...}` is not interpolated. It also references `name` and `price` without accessing properties on the current item.
- **Suggested fix:** Use a template literal with backticks and valid property access, such as `` `${item.name} : $${item.price}` ``.
- **Status:** Fixed

### Issue 10

- **Location:** `src/receipt.ts:47`
- **Issue:** Subtotal output references the function instead of calling it
- **Explanation:** `String(total)` converts the function object to text rather than displaying the calculated subtotal.
- **Suggested fix:** Call the function with `total()` and format the returned number.
- **Status:** Fixed

### Issue 11

- **Location:** `src/receipt.ts:48`
- **Issue:** Unterminated and mismatched string literal
- **Explanation:** The line starts with a backtick and ends with a double quote. This creates a syntax error and prevents the module from compiling.
- **Suggested fix:** Use matching backticks and interpolate the intended numeric tax value.
- **Status:** Fixed

### Issue 12

- **Location:** `src/receipt.ts:49`
- **Issue:** Unterminated string literal and incorrect tax argument
- **Explanation:** The line has the same mismatched quote problem and passes `String(taxRate)` to a function that expects a numeric rate. It also does not clearly format the final total.
- **Suggested fix:** Use matching template-literal delimiters, keep `taxRate` numeric, and pass the value returned by the corrected tax calculation.
- **Status:** Fixed

## ESLint Review

ESLint reported one parsing error:

- **Location:** `src/receipt.ts:17:27`
- **Diagnostic:** `Parsing error: ':' expected`
- **Related issue:** Issue 2 already documents the invalid object literal syntax at this location.

ESLint did not identify any additional issue that was missing from the manual review.

## Classification Examples

### Root Cause

The extra comma at `src/receipt.ts:12` creates an `undefined` item. This malformed data is an underlying cause of later failures when total or receipt code assumes every item has a `price`.

### Error

The implementation decision at `src/receipt.ts:22` to search for the literal string `"name"` instead of comparing item `name` properties is an incorrect development action.

### Defect

The code at `src/receipt.ts:28` uses `for (const i of 3)`. This invalid implementation artifact cannot iterate over the grocery items and is a defect in the source code.

### Failure

The application cannot be imported or run because of the syntax errors at `src/receipt.ts:17`, `src/receipt.ts:48`, and `src/receipt.ts:49`. This inability to execute is the observable failure resulting from defects in the source.

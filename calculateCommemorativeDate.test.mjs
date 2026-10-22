// calculateCommemorativeDate.test.mjs
import test from "node:test";
import assert from "node:assert";

// Importing  the function calculateCommemorativeDate 
import { calculateCommemorativeDate } from "./calculateCommemorativeDate.mjs";

// Testing Occurrence days

test("first Monday of January 2024", () => {
  const result = calculateCommemorativeDate(2024, 0, "Monday", "first");
  assert.equal(result, 1); // Jan 1, 2024 is Monday
});

test("second Tuesday of October 2024 (Ada Lovelace Day)", () => {
  const result = calculateCommemorativeDate(2024, 9, "Tuesday", "second");
  assert.equal(result, 8);
});

test("third Friday of March 2024", () => {
  const result = calculateCommemorativeDate(2024, 2, "Friday", "third");
  assert.equal(result, 15);
});


//  Testing for LAST OCCURRENCE 

test("last Friday of October 2024 (World Lemur Day)", () => {
  const result = calculateCommemorativeDate(2024, 9, "Friday", "last");
  assert.equal(result, 25);
});

test("last Tuesday of February 2023", () => {
  const result = calculateCommemorativeDate(2023, 1, "Tuesday", "last");
  assert.equal(result, 28);
});


//  Testing for leap LEAP YEAR 

test("last Wednesday of February 2024 (leap year)", () => {
  const result = calculateCommemorativeDate(2024, 1, "Wednesday", "last");
  assert.equal(result, 28);
});

test("last Wednesday of February 2023 (non-leap year)", () => {
  const result = calculateCommemorativeDate(2023, 1, "Wednesday", "last");
  assert.equal(result, 22);
});


// TESTING FOR REAL COMMEMORATIVE DAYS ACROSS MULTIPLE YEARS

test("Ada Lovelace Day across multiple years", () => {
  const expected = {
    2023: 10,
    2024: 8,
    2025: 14,
    2026: 13,
  };

  for (const year in expected) {
    const result = calculateCommemorativeDate(
      Number(year),
      9,
      "Tuesday",
      "second",
    );
    assert.equal(result, expected[year]);
  }
});

test("Red Panda Day (third Saturday of September 2024)", () => {
  const result = calculateCommemorativeDate(2024, 8, "Saturday", "third");
  assert.equal(result, 21);
});

test("World Lemur Day (last Friday of October 2024)", () => {
  const result = calculateCommemorativeDate(2024, 9, "Friday", "last");
  assert.equal(result, 25);
});


//  TESTING FOR EDGE CASES

test("target weekday occurs only 4 times (April 2024 Tuesdays)", () => {
  const result = calculateCommemorativeDate(2024, 3, "Tuesday", "third");
  assert.equal(result, 16);
});

test("target weekday occurs 5 times (March 2024 Fridays)", () => {
  const result = calculateCommemorativeDate(2024, 2, "Friday", "last");
  assert.equal(result, 29);
});

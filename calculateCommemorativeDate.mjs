import { getWeekDaysNames } from "./common.mjs";

// Calculating commemorative dates
export function calculateCommemorativeDate(year, month, day, occurrence) {
  const occurrences = ["first", "second", "third"];
  const targetOccurrence = occurrences.indexOf(occurrence) + 1;

  const weekdays = getWeekDaysNames();
  const targetWeekDay = weekdays.indexOf(day);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Number of times the target weekday is encountered
  let count = 0;
  if (occurrence === "last") {
    for (let j = daysInMonth; j >= 1; j--) {
      // 31, 30, 29, 28, ..., 3, 2, 1
      const y = new Date(year, month, j).getDay(); // 2

      if (y === targetWeekDay) {
        return new Date(year, month, j).getDate();
      }
    }
  } else {
    for (let i = 1; i <= daysInMonth; i++) {
      // finding the weekday of the (n)th date of the month
      const x = new Date(year, month, i).getDay();

      if (x === targetWeekDay) {
        count++;
        if (count === targetOccurrence) {
          return new Date(year, month, i).getDate();
        }
      }
    }
  }
}

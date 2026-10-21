

import fs from "fs";
import path from "path";
import { getMonthNames, getWeekDaysNames } from "./common.mjs";


const daysJsonPath = path.join(process.cwd(), "public", "days.json");
const daysData = JSON.parse(fs.readFileSync(daysJsonPath, "utf8"));


const START_YEAR = 2020;
const END_YEAR = 2030;
const OUTPUT_FILE = path.join(process.cwd(), "days.ics");


function calculateCommemorativeDate(year, month, dayName, occurrence) {
  const occurrences = ["first", "second", "third"];
  const targetOccurrence = occurrences.indexOf(occurrence);

  const weekdays = getWeekDaysNames();
  const targetWeekDay = weekdays.indexOf(dayName);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  if (occurrence === "last") {
    for (let j = daysInMonth; j >= 1; j--) {
      const weekday = new Date(year, month, j).getDay();
      if (weekday === targetWeekDay) {
        return j;
      }
    }
  } else {
    let count = -1;
    for (let i = 1; i <= daysInMonth; i++) {
      const weekday = new Date(year, month, i).getDay();
      if (weekday === targetWeekDay) {
        count++;
        if (count === targetOccurrence) {
          return i;
        }
      }
    }
  }
}


function formatDateToICS(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function createEvent(name, date, descriptionURL) {
  const dtStamp = formatDateToICS(new Date());
  const dtStart = formatDateToICS(date);

  return [
    "BEGIN:VEVENT",
    `DTSTAMP:${dtStamp}T000000Z`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `SUMMARY:${name}`,
    `DESCRIPTION:${descriptionURL}`,
    "END:VEVENT",
  ].join("\n");
}


function generateICS() {
  const months = getMonthNames();
  let events = [];

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    console.log(`Computing commemorative days for ${year}...`);

    daysData.forEach((day) => {
      const monthIndex = months.indexOf(day.monthName);
      const dayNumber = calculateCommemorativeDate(
        year,
        monthIndex,
        day.dayName,
        day.occurrence,
      );

      const dateObj = new Date(year, monthIndex, dayNumber);

      events.push(createEvent(day.name, dateObj, day.descriptionURL));
    });
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Days Calendar//EN",
    ...events,
    "END:VCALENDAR",
  ].join("\n");

  fs.writeFileSync(OUTPUT_FILE, icsContent, "utf8");
  console.log(` days.ics generated successfully at: ${OUTPUT_FILE}`);
}


generateICS();

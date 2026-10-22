Testing

This document explains how I tested the requirements of the Days Calendar Project.
1. Current month display
Requirement: The calendar must open showing the current month.
Testing method: Manual testing in the browser.
Steps:
1.	I opened the website.
2.	I checked the calendar header (Month Year) on initial load.
3.	I confirmed that the displayed month and year matched the current system date.
Result: The calendar correctly displayed the current month and year on page load.

2. October 2024 layout and commemorative dates
Requirement: October 2024 must show correct grid layout and commemorative dates.
Testing method: Manual testing in the browser.
Steps:
1.	I selected October 2024 using the month/year dropdown.
2.	I checked that the calendar displayed a 5×7 grid.
3.	I verified:
o	Row 1 starts at Tuesday October 1.
o	Row 5 ends at Thursday October 31.
o	Padding cells before/after the month were correct.
4.	I checked commemorative dates:
o	October 8 → Ada Lovelace Day.
o	October 25 → World Lemur Day.
Result: The layout and commemorative dates for October 2024 were correct.

3. October 2020 commemorative dates
Requirement: October 2020 must show correct commemorative dates.
Testing method: Manual testing in the browser.
Steps:
1.	I selected October 2020.
2.	I verified:
o	October 13 → Ada Lovelace Day.
o	October 30 → World Lemur Day.
Result: Both commemorative dates appeared correctly.

4. May 2030 commemorative dates
Requirement: May 2030 must show International Binturong Day.
Testing method: Manual testing in the browser.
Steps:
1.	I selected May 2030.
2.	I checked that May 11 displayed “International Binturong Day”.
Result: International Binturong Day appeared correctly on May 11, 2030.

5. Month start/end padding correctness
Requirement: Specific months must start and end on correct weekdays with correct padding.
Testing method: Manual testing in the browser.
Steps:
1.	I opened each required month:
o	2024 12
o	2025 02
o	2025 05
o	2026 02
2.	I counted blank cells before day 1 and after the last day.
3.	I compared the results with the rubric expectations.
Result:
•	2024 12: Sunday start (0 blanks), Tuesday end (4 blanks).
•	2025 02: Saturday start (6 blanks), Friday end (1 blank).
•	2025 05: Thursday start (4 blanks), Saturday end (0 blanks).
•	2026 02: Sunday start (0 blanks), Saturday end (0 blanks). 

6. Previous and next buttons
Requirement: Previous and next buttons must work correctly at all endpoints.
Testing method: Manual testing in the browser.
Steps:
1.	I navigated to the lowest year in the dropdown.
2.	I clicked Previous repeatedly.
3.	I confirmed:
o	No “undefined”, “null”, or “NaN” appeared.
o	The calendar continued rendering correctly.
4.	I repeated the test at the highest year using Next.
Result: Navigation worked correctly at all endpoints with no invalid UI states.

7. Jump to month+year
Requirement: The user must be able to jump to any month and year.
Testing method: Manual testing in the browser.
Steps:
1.	I selected various month/year combinations.
2.	I clicked Go.
3.	I confirmed that the calendar updated correctly each time.
Result: The jump-to-date feature worked correctly for all tested combinations.

8. Dynamic DOM generation
Requirement: UI must be generated dynamically via DOM manipulation.
Testing method: Manual inspection using DevTools.
Steps:
1.	I inspected the DOM.
2.	I confirmed:
o	Weekday names were generated dynamically.
o	Month/year dropdowns were populated via JavaScript.
o	Calendar days were created dynamically.
3.	I added an extra commemorative day to days.json and reloaded the page.
Result: The UI updated correctly and dynamically, confirming DOM-based generation.

9. Accessibility
Requirement: The website must score 100% accessibility in Lighthouse (Desktop) snapshot.
Testing method: Lighthouse audit and keyboard navigation.
Steps:
1.	I opened Chrome DevTools.
2.	I ran a Lighthouse audit (Accessibility only, Desktop mode).
3.	I navigated the page using only the keyboard.
4.	I confirmed that all interactive elements were reachable and usable.
Result: Lighthouse Accessibility scored 100%, and keyboard navigation worked correctly.

10. Unit tests in calculateCommemorativeDate.test.mjs
Requirement: At least one rubric point must be tested using unit tests.
Testing method: Unit tests in calculateCommemorativeDate.test.mjs.
Steps:
1.	I ran:
npm test
2.	I checked the terminal output.
3.	I confirmed tests covered:
o	First/second/third/last weekday calculations.
o	Leap year vs non leap year.
o	Months with 4 vs 5 occurrences.
o	Multi-year Ada Lovelace Day.
4.	All tests passed.
Result: All non-trivial date calculation logic is covered by unit tests.

11. No dead code
Requirement: All JavaScript and CSS must be used.
Testing method: Manual code audit.
Steps:
1.	I checked all .mjs files for unused functions.
2.	I checked styles.css for unused selectors.
3.	I removed any unused legacy code.
Result: No dead code remains in the project.

12. iCal generation (days.ics)
Requirement: The Node script must generate a correct .ics file matching the web UI.
Testing method: Manual testing with Google Calendar.
Steps:
1.	I ran node generate-ical.mjs

2.	I imported days.ics into Google Calendar.
3.	I checked:
o	Ada Lovelace Day
o	World Lemur Day
o	International Binturong Day
o	All other commemorative dates
4.	I confirmed events were whole-day events.
Result: The .ics file matched the web UI exactly, and all events were whole-day events.

13. Shared logic between web and iCal
Requirement: Date calculation logic must be shared.
Testing method: Code inspection.
Steps:
1.	I checked imports in both web.mjs and generate-ical.mjs.
2.	I confirmed both use:
calculateCommemorativeDate.mjs
3.	I verified identical results in UI and .ics.
Result: Both systems share the same date calculation logic.


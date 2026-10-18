
import { getMonthNames, getWeekDaysNames, getYearRange } from "../common.mjs";
import daysData from "../public/days.json" with { type: "json" };

// Defining Variables
const calendarDates = document.querySelector(".calendar-dates");
const calendarWeekdays = document.querySelector(".calendar-weekdays");
const monthYear = document.getElementById("month-year");
const prevMonthButton = document.querySelector(".prev-month");
const nextMonthButton = document.querySelector(".next-month");

const form = document.querySelector(".jump-to-date");

const monthDropdown = document.getElementById("month-dropdown");
const yearDropdown = document.getElementById("year-dropdown");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();


// Loading Week Days
function loadWeekDays() {
    const weekDays = getWeekDaysNames();

    weekDays.forEach(weekDay => {
        const day = document.createElement("div");
        day.textContent = weekDay;
        calendarWeekdays.appendChild(day);
    })
}

// Populating Months Dropdown
function loadMonths() {
    const months = getMonthNames();

    for (let i = 0; i < months.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = months[i];
        monthDropdown.appendChild(option);
    }

    monthDropdown.value = currentMonth;
}

// Populating Years Dropdown
function loadYears() {
    const yearRange = getYearRange();

    for (let i = yearRange.start; i <= yearRange.end; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        yearDropdown.appendChild(option);
    }

    yearDropdown.value = currentYear;
}

// Submitting the form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (monthDropdown.value == "" || yearDropdown.value == "") {
        return;
    }

    const month = Number(monthDropdown.value);
    const year = Number(yearDropdown.value);

    renderCalendar(month, year);
    currentMonth = month;
    currentYear = year;
})


function renderCalendar(month, year) {

    const months = getMonthNames();

    calendarDates.innerHTML = "";
    monthYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement("div");
        calendarDates.appendChild(blank);
    }

    const today = new Date();

    // Populate the days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.textContent = i;

        // Highlighting today's date
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            day.classList.add('current-date');
        }

        calendarDates.appendChild(day);
    }
}

function updateCalendar() {
    renderCalendar(currentMonth, currentYear);
    monthDropdown.value = currentMonth;
    yearDropdown.value = currentYear;
}


prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    updateCalendar();
})

nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    updateCalendar();
})



window.onload = function () {
    // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
    loadWeekDays();
    loadMonths();
    loadYears();
    renderCalendar(currentMonth, currentYear);
}

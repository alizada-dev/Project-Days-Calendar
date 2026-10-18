
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
        const x = document.createElement("div");
        x.textContent = weekDay;
        calendarWeekdays.appendChild(x);
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
}

// Submitting the form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (monthDropdown.value == "" || yearDropdown.value == "") {
        return;
    }

    renderCalendar(monthDropdown.value, yearDropdown.value);
    currentMonth = monthDropdown.value;
    currentYear = yearDropdown.value;
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

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.textContent = i;
        calendarDates.appendChild(day);
    }
}


prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentMonth, currentYear);
})

nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentMonth, currentYear);
})



window.onload = function () {
    // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
    renderCalendar(currentMonth, currentYear);
    loadWeekDays();
    loadMonths();
    loadYears();
}

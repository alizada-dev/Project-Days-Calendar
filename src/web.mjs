
import { getWeekDaysNames } from "../common.mjs";
import daysData from "../days.json" with { type: "json" };

const calendarWeekdays = document.querySelector(".calendar-weekdays");
const monthYear = document.getElementById("month-year");
const prevMonthButton = document.querySelector(".prev-month");
const nextMonthButton = document.querySelector(".next-month");

function loadWeekDays() {
    const weekDays = getWeekDaysNames();

    weekDays.forEach(weekDay => {
        const x = document.createElement("p");
        x.textContent = weekDay;
        calendarWeekdays.appendChild(x);
    })
}



window.onload = function () {
    // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
    loadWeekDays();
}

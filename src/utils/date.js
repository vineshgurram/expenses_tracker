import { dateElement } from "../ui/domElements";

// DATE PICKER ELEMENT
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

dateElement.setAttribute("max", `${year}-${month}-${day}`);
dateElement.setAttribute("min", `${year - 1}-${month}-${day}`);

export {today,year,month,day,months}
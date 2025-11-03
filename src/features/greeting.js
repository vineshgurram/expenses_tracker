import { greetingMessageElement } from "../ui/domElements";
import { today } from "../utils/date";

export function setGreetingMessage() {
  const hours = today.getHours();

  let message = "";

  if (hours >= 5 && hours < 12) {
    message = "Good Morning,";
  } else if (hours >= 12 && hours < 17) {
    message = "Good Afternoon,";
  } else if (hours >= 17 && hours < 21) {
    message = "Good Evening,";
  } else {
    message = "Good Night,";
  }

  greetingMessageElement.textContent = message;
}
import { dateElement } from "../ui/domElements";
import { showToast } from "../utils/toast";

export function validateDate() {
  if (!dateElement.value) {
    showToast("Please select a date");
    return false;
  } else {
    return true;
  }
}

export function validateExpenseCategories(value) {
  if (!value) {
    showToast("Please select a category");
    return false;
  } else {
    return true;
  }
}

export function validateAmount(amount) {
  if (!amount || amount.trim() === "") {
    showToast("Please enter an amount");
    return false;
  } else if (isNaN(amount)) {
    const amount = Number(amount);
    showToast("Amount must be a number");
    return false;
  } else if (amount <= 0) {
    showToast("Amount must be greater than 0");
    return false;
  }

  return true;
}

import { currentBalanceElement,incomeBalanceElement,expenseBalanceElement } from "./domElements";
import { store } from "../state/store";

export function updateDOMBalance() {
  currentBalanceElement.textContent = store.currentBalance;
  incomeBalanceElement.textContent = store.incomeBalance;
  expenseBalanceElement.textContent = store.expenseBalance;
}

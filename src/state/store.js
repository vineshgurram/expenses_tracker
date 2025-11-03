import { setLocal, getLocal } from "../utils/storage";

// variables for local storages
export const store = {
  transactions: getLocal("transactions", []),
  currentBalance: Number(getLocal("currentBalance", 0)),
  expenseBalance: Number(getLocal("expenseBalance", 0)),
  incomeBalance: Number(getLocal("incomeBalance", 0)),
  userName: getLocal("userName", null),
};

export function saveStore() {
  setLocal("transactions", store.transactions);
  setLocal("currentBalance", store.currentBalance);
  setLocal("expenseBalance", store.expenseBalance);
  setLocal("incomeBalance", store.incomeBalance);
}

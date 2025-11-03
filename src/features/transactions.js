import { store, saveStore } from "../state/store";
import { updateDOMBalance } from "../ui/balanceUI";
import { updateDOMTransaction } from "../ui/transactionsUI";

export function updateBalance(txn) {
  const transactions = store.transactions;
  transactions.push(txn);

  if (txn.expenseType === "income") {
    store.currentBalance += txn.amount;
    store.incomeBalance += txn.amount;
  } else {
    store.currentBalance -= txn.amount;
    store.expenseBalance += txn.amount;
  }
  
  saveStore();
  updateDOMTransaction();
  updateDOMBalance();
}

import { store } from "../state/store";
import { getLocal } from "../utils/storage";
import { transactionsWrapper } from "./domElements";

export function updateDOMTransaction() {
  const savedTransactions = store.transactions;
  let allTransactionHTML = "";
  if (savedTransactions.length) {
    for (const data of savedTransactions) {
      allTransactionHTML += `<div class="trans-box d-flex justify-content-between mb-4">
                <div class="left-box">
                  <p class="bs-para typ-16 text-capitalize m-0">${
                    data.descriptionOfTransaction
                      ? data.descriptionOfTransaction
                      : "Transaction Name"
                  }</p>
                  <p class="bs-para typ-12 typ-grey m-0">${
                    data.dateOfTransaction
                  }</p>
                </div>
                <div class="right-box">
                  <p class="bs-para typ-16 typ-600 mb-0 ${
                    data.expenseType == "income" ? "income" : "expense"
                  }">${data.expenseType == "income" ? " + " : " - "}₹ ${
        data.amount
      }</p>
                </div>
              </div>`;
    }
  } else {
    allTransactionHTML += `<div class="no-transaction-box text-center m-0 p-4">
              <h3 class="bs-para typ-16 typ-700 mb-0">
                  No Transactions
              </h3>
            </div>`;
  }

  transactionsWrapper.innerHTML = allTransactionHTML;
}

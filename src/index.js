import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import "./assets/css/fonts.css";
import "./assets/css/style.css";

// State
const transactions = [];
let currentBalance = 0;
let expenseBalance = 0;
let incomeBalance = 0;

const transactionForm = document.getElementById("transaction-form");
const currentBalanceElement = document.getElementById("current-balance");
const incomeBalanceElement = document.getElementById("income-balance");
const expenseBalanceElement = document.getElementById("expense-balance");
const descriptionElement = document.getElementById("description");
const dateElement = document.getElementById("date");
const categorySelect = document.querySelector("select[name='category']");
const expenseTypeRadios = document.querySelectorAll(
  'input[name="expense-type"]'
);
const transactionsWrapper = document.getElementById("all-transactions");
const amountElement = document.getElementById("amount");

currentBalanceElement.textContent = currentBalance;
incomeBalanceElement.textContent = incomeBalance;
expenseBalanceElement.textContent = expenseBalance;

// DATE PICKER ELEMENT
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateElement.setAttribute("max", `${year}-${month}-${day}`);
dateElement.setAttribute("min", `${year - 1}-${month}-${day}`);

// OPTIONS CHANGE AS PER RADIO CHECKED
const expenseCategories = {
  income: ["Salary", "Freelance", "Other"],
  expense: ["Food", "Entertainment", "Mobile Recharge", "Travel Expense"],
};

function updateCategoryOptions(type) {
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  expenseCategories[type].forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.textContent = option;
    categorySelect.appendChild(newOption);
  });
}

expenseTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function (e) {
    const selectedCategory = e.target.value;
    updateCategoryOptions(selectedCategory);
  });
});

function validateDate() {
  if (!dateElement.value) {
    const dateError = document.createElement("p");
    // dateElement.textContent = " ";
    // dateError.textContent = "Enter Date";
    // dateElement.after(dateError);
    // document.body.style.border = "1px solid red";
    showToast("Please select a date");
    return false;
  } else {
    return true;
  }
}

function validateExpenseCategories(value) {
  if (value === "") {
    showToast("Please select a category");
    return false;
  } else {
    return true;
  }
}

function updateBalance(type, amount) {
  if (type === "income") {
    currentBalance += amount;
    incomeBalance += amount;
  } else {
    currentBalance -= amount;
    expenseBalance += amount;
  }

  currentBalanceElement.textContent = currentBalance;
  incomeBalanceElement.textContent = incomeBalance;
  expenseBalanceElement.textContent = expenseBalance;
}

function updateDOMTransaction() {
  let allTransactionHTML = "";
  if (transactions.length) {
    for (const data of transactions) {
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

function showToast(message, type = "danger") {
  const toastMsg = document.getElementById("toastMessage");
  const toastElement = document.getElementById("liveToast");

  toastMsg.textContent = message;

  // change background based on type
  toastElement.classList.remove("bg-danger", "bg-success");
  toastElement.classList.add(type === "success" ? "bg-success" : "bg-danger");

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

const addNewTransaction = document.getElementById("add-new-button");
const homeButton = document.getElementById("home-button");
const userButton = document.getElementById("user-button");
const homeElements = document.getElementById("home-wrapper");
const plusElements = document.getElementById("plus-wrapper");
const profileElements = document.getElementById("profile-wrapper");

addNewTransaction.addEventListener("click", function () {
  homeElements.style.display = "none";
  profileElements.style.display = "none";
  plusElements.style.display = "block";
});

userButton.addEventListener("click", function () {
  homeElements.style.display = "none";
  plusElements.style.display = "none";
  profileElements.style.display = "block";
});

homeButton.addEventListener("click", function () {
  homeElements.style.display = "block";
  plusElements.style.display = "none";
  profileElements.style.display = "none";
});

transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedCategoryValue = categorySelect.selectedOptions[0].value;
  let amountValue = amountElement.value;
  const descriptionValue = descriptionElement.value;
  const dateValue = dateElement.value;
  const radioExpenseElement = document.querySelector(
    'input[name="expense-type"]:checked'
  );
  const radioExpenseValue = radioExpenseElement.value;

  if (
    amountValue &&
    validateDate() &&
    validateExpenseCategories(selectedCategoryValue)
  ) {
    const dataObject = {
      expenseType: radioExpenseValue,
      category: selectedCategoryValue,
      dateOfTransaction: dateValue,
      descriptionOfTransaction: descriptionValue,
      amount: amountValue,
    };

    transactions.push(dataObject);
    updateBalance(radioExpenseValue, Number(amountValue));
    updateDOMTransaction();
    transactionForm.reset();
  }
});

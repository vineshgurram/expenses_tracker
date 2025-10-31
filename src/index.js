import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import "./assets/css/fonts.css";
import "./assets/css/style.css";

// State
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentBalance = Number(localStorage.getItem("currentBalance")) || 0;
let expenseBalance = Number(localStorage.getItem("expenseBalance")) || 0;
let incomeBalance = Number(localStorage.getItem("incomeBalance")) || 0;

let userName = null;

// ELEMENT SELECTORS
const transactionForm = document.getElementById("transaction-form");
const introForm = document.getElementById("intro-form-wrapper");
const currentBalanceElement = document.getElementById("current-balance");
const headerElement = document.getElementById("header");
const incomeBalanceElement = document.getElementById("income-balance");
const expenseBalanceElement = document.getElementById("expense-balance");
const userNameElements = document.querySelectorAll(".user-name");
const descriptionElement = document.getElementById("description");
const dateElement = document.getElementById("date");
const userAvatarElement = document.getElementById("user-avatar");
const fullNameElement = document.getElementById("full-name");
const userNameIDElement = document.getElementById("user-name-id");
const homeElements = document.getElementById("home-wrapper");
const plusElements = document.getElementById("plus-wrapper");
const profileElements = document.getElementById("profile-wrapper");
const breadcrumbTitleElements = document.getElementById("breadcrumb-title");
const amountElement = document.getElementById("amount");
const categorySelect = document.querySelector("select[name='category']");
const expenseTypeRadios = document.querySelectorAll(
  'input[name="expense-type"]'
);
const greetingMessageElement = document.getElementById("greeting-message");
const transactionsWrapper = document.getElementById("all-transactions");
const topBoxWrapper = document.getElementById("top-box-wrapper");
const breadcrumbWrapper = document.getElementById("breadcrumb-wrapper");
const greetingWrapper = document.getElementById("greetings-wrapper");
const introWrapper = document.getElementById("intro-wrapper");
const addNewTransaction = document.getElementById("add-new-button");
const homeButton = document.getElementById("home-button");
const userButton = document.getElementById("user-button");
const backButton = document.getElementById("back-button");
const getStartedButton = document.getElementById("get-started-button");

// UPDATE DOM AS PER STATE
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
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// OPTIONS CHANGE AS PER RADIO CHECKED
const expenseCategories = {
  income: ["Salary", "Freelance", "Other"],
  expense: [
    "Food",
    "Entertainment",
    "Mobile Recharge",
    "Travel Expense",
    "Other",
  ],
};

function updateCategoryOptions(type) {
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  expenseCategories[type].forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.split(" ").join("-").toLowerCase();
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

  localStorage.setItem("currentBalance", currentBalance);
  localStorage.setItem("incomeBalance", incomeBalance);
  localStorage.setItem("expenseBalance", expenseBalance);
}


function updateDOMTransaction() {
  const savedTransactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
  let allTransactionHTML = "";
  if (transactions.length) {
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
  const date = new Date(dateValue);
  console.log(date.getDate(), date.getFullYear(),months[date.getMonth()]);
  if (
    Number(amountValue) &&
    validateDate() &&
    validateExpenseCategories(selectedCategoryValue)
  ) {
    const dataObject = {
      expenseType: radioExpenseValue,
      category: selectedCategoryValue,
      dateOfTransaction: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
      descriptionOfTransaction: descriptionValue,
      amount: Number(amountValue),
    };

    transactions.push(dataObject);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateBalance(radioExpenseValue, Number(amountValue));
    updateDOMTransaction();
    transactionForm.reset();
    showHomeScreen();
  }
});

getStartedButton.addEventListener("click", function (e) {
  const currentElement = e.target;
  currentElement.parentElement.nextElementSibling.style.display = "block";
  currentElement.parentElement.remove();
});

introForm.addEventListener("submit", function (e) {
  e.preventDefault();
  userName = fullNameElement.value;
  if (userName) {
    introWrapper.remove();
    showHomeScreen();
    updateUsername(userName);
  }
});

function updateUsername(name) {
  userNameElements.forEach((element) => {
    element.textContent = name;
  });
  const formattedID = `@${name.split(" ").join("_").toLowerCase()}`;
  userNameIDElement.textContent = formattedID;
  userAvatarElement.textContent = name[0].toUpperCase();
  localStorage.setItem("userName", name);
  localStorage.setItem("userID", formattedID);
}

function showHomeScreen() {
  topBoxWrapper.style.display = "block";
  homeElements.style.display = "block";
  greetingWrapper.style.display = "block";
  headerElement.style.display = "flex";
  plusElements.style.display = "none";
  profileElements.style.display = "none";
  breadcrumbWrapper.style.display = "none";
}

function showProfileScreen() {
  homeElements.style.display = "none";
  plusElements.style.display = "none";
  profileElements.style.display = "block";
  breadcrumbWrapper.style.display = "block";
  greetingWrapper.style.display = "none";
  breadcrumbTitleElements.textContent = "Profile";
}

function showNewTransactionScreen() {
  homeElements.style.display = "none";
  profileElements.style.display = "none";
  plusElements.style.display = "block";
  breadcrumbWrapper.style.display = "block";
  greetingWrapper.style.display = "none";
  breadcrumbTitleElements.textContent = "Add Income/Expense";
}

function setGreetingMessage() {
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

// function showScreen() {
//   if (localStorage.getItem("userName")) {
//     showHomeScreen();
//   } else {
//     showIntroScreen();
//   }
// }

function showIntroScreen() {
  introWrapper.style.display = "block";
}

// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// showScreen();

// SWITCHES WITH PAGES
userButton.addEventListener("click", showProfileScreen);

homeButton.addEventListener("click", showHomeScreen);

backButton.addEventListener("click", showHomeScreen);

addNewTransaction.addEventListener("click", showNewTransactionScreen);

// ONLOAD LOGICS
window.addEventListener("DOMContentLoaded", () => {
  const storedName = localStorage.getItem("userName");
  const storedID = localStorage.getItem("userID");

  if (storedName && storedID) {
    introWrapper.remove();
    showHomeScreen();
    updateUsername(storedName);
    updateDOMTransaction();
  } else {
    showIntroScreen();
  }
});

setGreetingMessage();

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { store } from "./state/store";
import { getLocal } from "./utils/storage";
import { showToast } from "./utils/toast";
import { months } from "./utils/date";
import { deleteAccount } from "./features/delete";
import { updateUsername } from "./features/user";
import { updateBalance } from "./features/transactions";
import { updateCategoryOptions } from "./features/categoryChange";
import { updateDOMTransaction } from "./ui/transactionsUI";
import { showIntroScreen } from "./ui/uiController";
import { updateDOMBalance } from "./ui/balanceUI";
import { validateDate,validateExpenseCategories,validateAmount } from "./features/validate";
import {
  showHomeScreen,
  showNewTransactionScreen,
  showProfileScreen,
} from "./ui/uiController";
import {
  categorySelect,
  expenseTypeRadios,
  transactionForm,
  getStartedButton,
  introForm,
  userButton,
  homeButton,
  backButton,
  addNewTransaction,
  deleteButton,
  introWrapper,
  currentBalanceElement,
  incomeBalanceElement,
  expenseBalanceElement,
  fullNameElement,
  amountElement,
  descriptionElement,
  dateElement,
} from "./ui/domElements";

expenseTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function (e) {
    const selectedCategory = e.target.value;
    updateCategoryOptions(selectedCategory);
  });
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
  const date = new Date(dateValue);
  const amountCheck = validateAmount(amountValue);
  if (
    
    validateAmount(amountValue) &&
    validateDate() &&
    validateExpenseCategories(selectedCategoryValue)
  ) {
    const dataObject = {
      expenseType: radioExpenseValue,
      category: selectedCategoryValue,
      dateOfTransaction: `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      descriptionOfTransaction: descriptionValue,
      amount: Number(amountValue),
    };

    updateBalance(dataObject);
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
  store.userName = fullNameElement.value;
  // console.log(store);
  if (store.userName) {
    introWrapper.remove();
    showHomeScreen();
    updateUsername(store.userName);
  } else {
    showToast("Please enter name");
  }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// SWITCHES WITH PAGES
userButton.addEventListener("click", showProfileScreen);

homeButton.addEventListener("click", showHomeScreen);

backButton.addEventListener("click", showHomeScreen);

addNewTransaction.addEventListener("click", showNewTransactionScreen);

deleteButton.addEventListener("click", deleteAccount);

// ONLOAD LOGICS
window.addEventListener("DOMContentLoaded", () => {
  const storedName = getLocal("userName");
  const storedID = getLocal("userID");

  if (storedName && storedID) {
    introWrapper.remove();
    showHomeScreen();
    updateUsername(storedName);
    updateDOMTransaction();
    
  } else {
    showIntroScreen();
  }
});

updateDOMBalance();

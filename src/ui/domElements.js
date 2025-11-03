// ALL ELEMENT SELECTORS OF PROJECT

const homeElements = document.getElementById("home-wrapper");
const plusElements = document.getElementById("plus-wrapper");
const profileElements = document.getElementById("profile-wrapper");
const breadcrumbTitleElements = document.getElementById("breadcrumb-title");
const topBoxWrapper = document.getElementById("top-box-wrapper");
const breadcrumbWrapper = document.getElementById("breadcrumb-wrapper");
const greetingWrapper = document.getElementById("greetings-wrapper");
const headerElement = document.getElementById("header");
const currentBalanceElement = document.getElementById("current-balance");
const incomeBalanceElement = document.getElementById("income-balance");
const expenseBalanceElement = document.getElementById("expense-balance");
const userNameElements = document.querySelectorAll(".user-name");
const descriptionElement = document.getElementById("description");
const dateElement = document.getElementById("date");
const userAvatarElement = document.getElementById("user-avatar");
const fullNameElement = document.getElementById("full-name");
const userNameIDElement = document.getElementById("user-name-id");
const amountElement = document.getElementById("amount");
const toastMsg = document.getElementById("toastMessage");
const toastElement = document.getElementById("liveToast");
const transactionForm = document.getElementById("transaction-form");
const introForm = document.getElementById("intro-form-wrapper");
const categorySelect = document.querySelector("select[name='category']");
const expenseTypeRadios = document.querySelectorAll(
  'input[name="expense-type"]'
);
const greetingMessageElement = document.getElementById("greeting-message");
const transactionsWrapper = document.getElementById("all-transactions");
const introWrapper = document.getElementById("intro-wrapper");
const addNewTransaction = document.getElementById("add-new-button");
const homeButton = document.getElementById("home-button");
const userButton = document.getElementById("user-button");
const backButton = document.getElementById("back-button");
const deleteButton = document.getElementById("delete-button");
const getStartedButton = document.getElementById("get-started-button");

export {
  homeElements,
  plusElements,
  profileElements,
  breadcrumbTitleElements,
  topBoxWrapper,
  breadcrumbWrapper,
  greetingWrapper,
  headerElement,
  currentBalanceElement,
  incomeBalanceElement,
  userNameElements,
  expenseBalanceElement,
  descriptionElement,
  dateElement,
  userAvatarElement,
  fullNameElement,
  userNameIDElement,
  amountElement,
  toastMsg,
  toastElement,
  transactionForm,
  introForm,
  categorySelect,
  expenseTypeRadios,
  greetingMessageElement,
  transactionsWrapper,
  introWrapper,
  addNewTransaction,
  homeButton,
  userButton,
  backButton,
  deleteButton,
  getStartedButton
};

import {
  homeElements,
  plusElements,
  profileElements,
  breadcrumbTitleElements,
  topBoxWrapper,
  breadcrumbWrapper,
  greetingWrapper,
  headerElement,
  introWrapper
} from "./domElements";
import { setGreetingMessage } from "../features/greeting";


export function showHomeScreen() {
  topBoxWrapper.style.display = "block";
  homeElements.style.display = "block";
  greetingWrapper.style.display = "block";
  headerElement.style.display = "flex";
  plusElements.style.display = "none";
  profileElements.style.display = "none";
  breadcrumbWrapper.style.display = "none";
  setGreetingMessage();
}

export function showProfileScreen() {
  homeElements.style.display = "none";
  plusElements.style.display = "none";
  profileElements.style.display = "block";
  breadcrumbWrapper.style.display = "block";
  greetingWrapper.style.display = "none";
  breadcrumbTitleElements.textContent = "Profile";
}

export function showNewTransactionScreen() {
  homeElements.style.display = "none";
  profileElements.style.display = "none";
  plusElements.style.display = "block";
  breadcrumbWrapper.style.display = "block";
  greetingWrapper.style.display = "none";
  breadcrumbTitleElements.textContent = "Add Income/Expense";
}

export function showIntroScreen() {
  introWrapper.style.display = "block";
}

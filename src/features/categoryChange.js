import { categorySelect } from "../ui/domElements";
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

export function updateCategoryOptions(type) {
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  expenseCategories[type].forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option.split(" ").join("-").toLowerCase();
    newOption.textContent = option;
    categorySelect.appendChild(newOption);
  });
}
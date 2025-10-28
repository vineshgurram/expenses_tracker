import "./assets/css/fonts.css";
import "./assets/css/style.css";

const transactionForm = document.getElementById("transaction-form");

transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const expenseType = document.querySelector('input[name="expense-type"]:checked');
    const expenseTypeValue = expenseType.value;
    const categorySelect = document.querySelector("select[name='category']");
    const date = document.getElementById("date");
    const dateValue = date.valueAsDate;
    const description = document.getElementById("description");
    const amount = document.getElementById("amount");
    const amountValue = amount.value;
    const categorySelectedValue = categorySelect.value;

    if(categorySelect.selectedIndex){
        console.log(categorySelectedValue);
    }
    else{
        console.log("no category")
    }

    if (expenseType) {
        console.log(expenseTypeValue);
    } else {
        console.log("No type selected!");
    }
});



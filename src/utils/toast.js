import * as bootstrap from "bootstrap";
import { toastElement,toastMsg } from "../ui/domElements";

export function showToast(message, type = "bg-success") {
  toastMsg.textContent = message;
  toastElement.classList.remove("bg-success","bg-danger");
  toastElement.classList.add(type === "success" ? "bg-success" : "bg-danger");

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

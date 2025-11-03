import { store } from "../state/store";
import { setLocal } from "../utils/storage";
import {
  userNameElements,
  userNameIDElement,
  userAvatarElement,
} from "../ui/domElements";

export function updateUsername(name) {
  store.userName = name;
  userNameElements.forEach((element) => {
    element.textContent = name;
  });
  const formattedID = `@${name.split(" ").join("_").toLowerCase()}`;
  userNameIDElement.textContent = formattedID;
  userAvatarElement.textContent = name[0].toUpperCase();
  //   localStorage.setItem("userName", name);
  //   localStorage.setItem("userID", formattedID);

  setLocal("userName", name);
  setLocal("userID", formattedID);
}

import * as Yup from "yup";
import { useCheckEmail } from "../../store/hooks/use-check-email";
import { useState } from "react";

let uniqueEmail = false;
let username = "";
const isNameAvailable = async (name: string | undefined) => {
  try {
    const response = await fetch(`/users/checkemail/${name}`);
    if (!response.ok) {
      throw new Error("Hiba történt a szerverrel való kommunikáció során.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hiba:", error);
    return false;
  }
};

let isAvailable = false;
export const RegValidationSchema = Yup.object({
  email: Yup.string()
    .email("Érvénytelen e-mail cím formátum.")

    .test("unique-email", "ez az email cím már foglalt", async (email) => {
      //let isAvailable = false;
      if (username != email) isAvailable = await isNameAvailable(email);
      username = email ? email : "";
      return isAvailable;
    })
    .required("az e-mail megadás kötelező"),
  password: Yup.string()
    .min(6, "A jelszó legalább 6 karakterből kell álljon.")
    .required("A jelszó megadása kötelező."),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "A jelszavak nem egyeznek meg.")
    .required("A jelszó megerősítése kötelező."),
  chatname: Yup.string()
    .min(6, "A név legalább 6 karakterből kell álljon.")
    .required("A név megadása kötelező, ezzel tudsz bejelentkezni."),
});

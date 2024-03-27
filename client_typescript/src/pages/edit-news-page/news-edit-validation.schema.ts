import * as Yup from "yup";
export const newsEditValidationSchema = Yup.object({
  imgPath: Yup.string().required("Kép URL megadása kötelező"),
  title: Yup.string().required("Cím megadása kötelező"),
  subtitle: Yup.string().required("Leírás megadása kötelező"),
  text: Yup.string().required("Tartalom megadása kötelező"),
  types: Yup.array().min(1, "Please Select min one"),
});

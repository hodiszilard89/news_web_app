import * as Yup from "yup";
export const newsCommentValidationSchema = Yup.object({

  text: Yup.string().required("Tartalom megadása kötelező"),

});

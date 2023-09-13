import * as Yup from "yup" 
export const newsEditValidationSchema=Yup.object ({
    types: Yup.array()
    .min(1,"Please Select min one")
})
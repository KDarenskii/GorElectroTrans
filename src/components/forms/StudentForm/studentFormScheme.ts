import * as yup from "yup";

export const studentFormScheme = yup.object().shape({
    studentId: yup.string().required("Обязательное поле"),
    subdepartmentName: yup.string().required("Обязательное поле"),
});

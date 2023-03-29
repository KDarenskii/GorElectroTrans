import * as yup from "yup";

export const planFormScheme = yup.object().shape({
    topic: yup.string().required("Обязательное поле"),
    duration: yup.number().required("Обязательное поле").positive("Отрицальное значение"),
    peoplePlanned: yup
        .number()
        .required("Обязательное поле")
        .moreThan(0, "Минимальное значение: 1")
        .integer("Допустимы только целые значения"),
    date: yup.string().required("Обязательное поле"),
    teacher: yup.string().required("Обязательное поле"),
});

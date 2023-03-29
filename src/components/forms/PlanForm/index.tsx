import React from "react";
import useFocus from "../../../hooks/useFocus";
import { IPlan } from "../../../models/Plan";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import Textarea from "../../formElements/Textarea";
import DateInput from "../../formElements/DateInput";
import { Formik } from "formik";
import ActionButton from "../../buttons/ActionButton";
import { planFormScheme } from "./planFormScheme";
import FormErrorMessage from "../../formElements/FormErrorMessage";

import "./styles.scss";

type Props = {
    onSubmit: (values: PlanFormValues) => Promise<void>;
    plan?: IPlan;
    moveToConfrim?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
};

export type PlanFormValues = Omit<IPlan, "id">;

const PlanForm: React.FC<Props> = ({ onSubmit, plan, moveToConfrim, isDisabled }) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    useFocus(textareaRef, true);

    const initialDate = plan?.date ? new Date(plan.date) : new Date();
    const [date, setDate] = React.useState<Date | null>(initialDate);

    const initialState: PlanFormValues = {
        date: initialDate.toISOString(),
        duration: plan?.duration ?? 1,
        peoplePlanned: plan?.peoplePlanned ?? 10,
        teacher: plan?.teacher ?? "",
        topic: plan?.topic ?? "",
    };

    return (
        <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={planFormScheme}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit} className="plan-form">
                    <Label className="plan-form__label plan-form__label--mb" text="Тема занятия">
                        <Textarea
                            className="plan-form__textarea"
                            ref={textareaRef}
                            name="topic"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.topic}
                            disabled={isSubmitting || isDisabled}
                            placeholder="Тема"
                        />
                        {errors.topic && touched.topic && <FormErrorMessage>{errors.topic}</FormErrorMessage>}
                    </Label>
                    <div className="plan-form__row">
                        <Label className="plan-form__label" text="Длительность/ч.">
                            <Input
                                className="plan-form__input"
                                type="number"
                                name="duration"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.duration}
                                disabled={isSubmitting || isDisabled}
                                placeholder="Длительность"
                            />
                            {errors.duration && touched.duration && (
                                <FormErrorMessage>{errors.duration}</FormErrorMessage>
                            )}
                        </Label>
                        <Label className="plan-form__label" text="Кол-во людей">
                            <Input
                                className="plan-form__input"
                                type="number"
                                name="peoplePlanned"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.peoplePlanned}
                                disabled={isSubmitting || isDisabled}
                                placeholder="Количество"
                            />
                            {errors.peoplePlanned && touched.peoplePlanned && (
                                <FormErrorMessage>{errors.peoplePlanned}</FormErrorMessage>
                            )}
                        </Label>
                        <Label className="plan-form__label plan-form__label--mb" text="Дата">
                            <DateInput
                                className="plan-form__input"
                                name="date"
                                onChange={(date, event) => {
                                    event?.stopPropagation();
                                    setDate(date);
                                    setFieldValue("date", date?.toISOString());
                                }}
                                selected={date}
                                disabled={isSubmitting || isDisabled}
                            />
                            {errors.date && touched.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
                        </Label>
                    </div>
                    <Label className="plan-form__label" text="Преподаватель">
                        <Input
                            className="plan-form__input"
                            name="teacher"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.teacher}
                            disabled={isSubmitting || isDisabled}
                            placeholder="ФИО"
                            autoComplete="none"
                        />
                        {errors.teacher && touched.teacher && <FormErrorMessage>{errors.teacher}</FormErrorMessage>}
                    </Label>
                    <footer className="plan-form__footer">
                        {moveToConfrim && plan ? (
                            <>
                                <ActionButton disabled={isSubmitting || isDisabled} type="submit" colorType="success">
                                    Сохранить
                                </ActionButton>
                                <ActionButton
                                    disabled={isSubmitting || isDisabled}
                                    onClick={moveToConfrim}
                                    type="button"
                                    colorType="danger"
                                >
                                    Удалить
                                </ActionButton>
                            </>
                        ) : (
                            <ActionButton disabled={isSubmitting || isDisabled} type="submit" colorType="success">
                                Добавить
                            </ActionButton>
                        )}
                    </footer>
                </form>
            )}
        </Formik>
    );
};

export default PlanForm;

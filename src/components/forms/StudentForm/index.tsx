import React from "react";
import Input from "../../formElements/Input";
import Label from "../../formElements/Label";
import DropDown, { Option } from "react-dropdown";
import ActionButton from "../../buttons/ActionButton";
import { IDepartment } from "../../../models/Department";
import { IStudent, TNewStudent } from "../../../models/Student";
import { Formik } from "formik";
import useFocus from "../../../hooks/useFocus";
import { studentFormScheme } from "./studentFormScheme";
import FormErrorMessage from "../../formElements/FormErrorMessage";

import "react-dropdown/style.css";
import "./styles.scss";

type Props = {
    onSubmit: (values: TNewStudent) => Promise<void>;
    departments: IDepartment[];
    student?: IStudent;
    moveToConfrim?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    isEditing?: boolean;
};

const StudentForm: React.FC<Props> = ({ departments, onSubmit, student, moveToConfrim, isDisabled, isEditing }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    useFocus(inputRef, true);

    const options: Option[] = departments.map((dep) => ({ label: dep.name, value: dep.name }));

    const initialState: TNewStudent = {
        studentId: student?.studentId ?? "",
        subdepartmentName: student?.subdepartmentName ?? options[0]?.value ?? "",
    };

    return (
        <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={studentFormScheme}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, setFieldValue }) => (
                <form className="student-form" onSubmit={handleSubmit}>
                    {!isEditing && (
                        <Label className="student-form__label" text="Табельный номер">
                            <Input
                                className="student-form__input"
                                ref={inputRef}
                                name="studentId"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.studentId}
                                disabled={isSubmitting || isDisabled}
                                placeholder="Номер"
                                autoComplete="none"
                            />
                            {errors.studentId && touched.studentId && (
                                <FormErrorMessage>{errors.studentId}</FormErrorMessage>
                            )}
                        </Label>
                    )}
                    <Label className="student-form__label" text="Отдел">
                        <DropDown
                            className="student-form__select"
                            options={options}
                            value={values.subdepartmentName}
                            onChange={(option) => setFieldValue("subdepartmentName", option.value)}
                            disabled={isSubmitting || isDisabled}
                        />
                        {errors.subdepartmentName && touched.subdepartmentName && (
                            <FormErrorMessage>{errors.subdepartmentName}</FormErrorMessage>
                        )}
                    </Label>
                    <div className="student-form__actions">
                        {moveToConfrim && student ? (
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
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default StudentForm;

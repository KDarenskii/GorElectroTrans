import { Formik } from "formik";
import React from "react";
import useFocus from "../../../hooks/useFocus";
import { IMaterial } from "../../../models/Material";
import ActionButton from "../../buttons/ActionButton";
import FormErrorMessage from "../../formElements/FormErrorMessage";
import Input from "../../formElements/Input";
import InputFile from "../../formElements/InputFile";
import Label from "../../formElements/Label";

import "./styles.scss";

type Props = {
    onSubmit: (values: MaterialsFormState) => Promise<void>;
    material?: IMaterial;
    moveToConfrim?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean;
    isEditing?: boolean;
};

export type MaterialsFormState = {
    lessonId: number;
    file: File | null;
};

const MaterialForm: React.FC<Props> = ({ material, onSubmit, isEditing, isDisabled, moveToConfrim }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    useFocus(inputRef, true);

    const initialState: MaterialsFormState = {
        lessonId: 0,
        file: null,
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    ) => {
        const filesList = event.target.files;
        const file = filesList ? filesList[0] : null;
        setFieldValue("file", file);
    };

    return (
        <Formik initialValues={initialState} onSubmit={onSubmit}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, setFieldValue }) => (
                <form className="material-form" onSubmit={handleSubmit}>
                    {!isEditing && (
                        <Label className="material-form__label" text="Номер занятия">
                            <Input
                                className="material-form__input"
                                placeholder="Номер"
                                ref={inputRef}
                                type="number"
                                name="lessonId"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lessonId}
                                disabled={isSubmitting || isDisabled}
                                autoComplete="none"
                            />
                            {errors.lessonId && touched.lessonId && (
                                <FormErrorMessage>{errors.lessonId}</FormErrorMessage>
                            )}
                        </Label>
                    )}
                    <InputFile
                        className="material-form__input"
                        labelText="Конспект"
                        name="file"
                        onBlur={handleBlur}
                        onChange={(event) => handleFileChange(event, setFieldValue)}
                        file={values.file}
                        fileNameLabel={material?.fileName}
                        disabled={isSubmitting || isDisabled}
                        autoComplete="none"
                    />
                    {errors.file && touched.file && <FormErrorMessage>{errors.file}</FormErrorMessage>}
                    <div className="student-form__actions">
                        {moveToConfrim && material ? (
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

export default MaterialForm;

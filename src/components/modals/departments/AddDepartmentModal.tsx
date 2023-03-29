import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import useEscape from "../../../hooks/useEscape";
import { TNewDepartment } from "../../../models/Department";
import DepartmentService from "../../../services/DepartmentService";
import DepartmentForm from "../../forms/DepartmentForm";
import ModalLayout from "../ModalLayout";
import ModalContent from "../ModalLayout/ModalContent";
import ModalHeader from "../ModalLayout/ModalHeader";
import ModalMessage from "../ModalLayout/ModalMessage";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddDepartmentModal: React.FC<Props> = ({ setIsActive }) => {
    const modalRef = React.useRef<HTMLDivElement | null>(null);
    useClickOutside(modalRef, () => setIsActive(false));
    useEscape(() => setIsActive(false));

    const { divisionId = "" } = useParams();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: TNewDepartment) => {
        console.log(values);

        try {
            const response = await DepartmentService.post({ depId: divisionId, department: { ...values } });
            console.log(response);
        } catch (error) {
            console.log(error);
            const err = error as any;
            setError(err?.message ?? "Не удалось добавить запись");
        }
    };

    return (
        <ModalLayout ref={modalRef}>
            <ModalHeader closeModal={() => setIsActive(false)}>Добавление отдела</ModalHeader>
            {error && <ModalMessage>{error}</ModalMessage>}
            <ModalContent>
                <DepartmentForm onSubmit={handleSubmit} />
            </ModalContent>
        </ModalLayout>
    );
};

export default AddDepartmentModal;

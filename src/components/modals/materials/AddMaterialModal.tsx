import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NOTION } from "../../../constants/notion";
import { showNotion } from "../../../helpers/showNotion";
import useClickOutside from "../../../hooks/useClickOutside";
import useEscape from "../../../hooks/useEscape";
import MaterialService from "../../../services/MaterialService";
import MaterialForm, { MaterialsFormState } from "../../forms/MaterialForm";
import ModalLayout from "../ModalLayout";
import ModalContent from "../ModalLayout/ModalContent";
import ModalHeader from "../ModalLayout/ModalHeader";
import ModalMessage from "../ModalLayout/ModalMessage";

type Props = {
    closeModal: () => void;
};

const AddMaterialModal: React.FC<Props> = ({ closeModal }) => {
    const modalRef = React.useRef<HTMLDivElement | null>(null);
    useClickOutside(modalRef, closeModal);
    useEscape(closeModal);

    const { divisionId = "" } = useParams();

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: MaterialsFormState) => {
        console.log(values);
        const { file, lessonId } = values;

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await MaterialService.post(
                { depId: divisionId, file },
                {
                    params: {
                        fileName: file.name,
                        lessonId,
                    },
                }
            );
            console.log(response);
            showNotion(NOTION.SUCCESS, "Запись успешно добавлена");
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ModalLayout ref={modalRef}>
            <ModalHeader closeModal={closeModal}>Добавление записи</ModalHeader>
            {error && <ModalMessage>{error}</ModalMessage>}
            <ModalContent>
                <MaterialForm onSubmit={handleSubmit} />
            </ModalContent>
        </ModalLayout>
    );
};

export default AddMaterialModal;

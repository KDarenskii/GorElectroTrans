import React from "react";
import ActionButton from "../../../components/buttons/ActionButton";
import AddStudentModal from "../../../components/modals/students/AddStudentModal";
import useLockedBody from "../../../hooks/useLockedBody";

import "./styles.scss";

const NewStudent: React.FC = () => {
    const [isAdding, setIsAdding] = React.useState(false);

    useLockedBody(isAdding);

    const handleOpenEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsAdding(true);
    };

    return (
        <>
            {isAdding && <AddStudentModal closeModal={() => setIsAdding(false)} />}
            <ActionButton className="new-student-btn" colorType="info" onClick={handleOpenEditing}>
                Добавить +
            </ActionButton>
        </>
    );
};

export default NewStudent;

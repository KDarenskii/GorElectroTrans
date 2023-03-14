import React from "react";
import ActionButton from "../../components/buttons/ActionButton";
import AddStudentModal from "../../components/modals/AddStudentModal";
import useLockedBody from "../../hooks/useLockedBody";

const NewStudent: React.FC = () => {
    const [isAdding, setIsAdding] = React.useState(false);

    useLockedBody(isAdding);

    const handleOpenEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsAdding(true);
    };

    return (
        <>
            {isAdding && <AddStudentModal setIsActive={setIsAdding} />}
            <ActionButton colorType="add" onClick={handleOpenEditing}>
                Добавить +
            </ActionButton>
        </>
    );
};

export default NewStudent;

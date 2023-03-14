import React from 'react'
import ActionButton from '../../components/buttons/ActionButton';
import AddDepartmentModal from '../../components/modals/AddDepartmentModal';
import useLockedBody from '../../hooks/useLockedBody';

const NewDepartment: React.FC = () => {
    const [isAdding, setIsAdding] = React.useState(false);

    useLockedBody(isAdding);

    const handleOpenEditing = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsAdding(true);
    };

    return (
        <>
            {isAdding && <AddDepartmentModal setIsActive={setIsAdding} />}
            <ActionButton colorType="add" onClick={handleOpenEditing}>
                Добавить +
            </ActionButton>
        </>
    );
}

export default NewDepartment
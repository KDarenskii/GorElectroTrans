import React from "react";
import ActionButton from "../../components/buttons/ActionButton";
import WorkPlanReportModal from "../../components/modals/WorkPlanReportModal";
import useLockedBody from "../../hooks/useLockedBody";

type Props = {
    className?: string;
};

const WorkPlanReport: React.FC<Props> = ({ className }) => {
    const [isActive, setIsActive] = React.useState(false);

    useLockedBody(isActive);

    const handleOpenReport = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsActive(true);
    };

    return (
        <>
            {isActive && <WorkPlanReportModal setIsActive={setIsActive} />}
            <ActionButton onClick={handleOpenReport} colorType="submit">
                Сформировать отчет
            </ActionButton>
        </>
    );
};

export default WorkPlanReport;

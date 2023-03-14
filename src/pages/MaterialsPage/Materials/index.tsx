import React from "react";
import EditMaterialModal from "../../../components/modals/EditMaterialModal";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import useLockedBody from "../../../hooks/useLockedBody";

import "./styles.scss";

const Materials: React.FC = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    useLockedBody(isEditing);

    const handleOpenEditing = (event: React.MouseEvent<HTMLTableRowElement>) => {
        event.stopPropagation();
        setIsEditing(true);
    };

    return (
        <div className="materials">
            {isEditing && <EditMaterialModal setIsActive={setIsEditing} />}
            <Table className="materials__table">
                <TableHead>
                    <TableHeadCell>Номер занятия</TableHeadCell>
                    <TableHeadCell>Дата проведения</TableHeadCell>
                    <TableHeadCell>Тема занятия</TableHeadCell>
                    <TableHeadCell>Материалы</TableHeadCell>
                </TableHead>
                <tbody>
                    <TableBodyRow onClick={handleOpenEditing}>
                        <TableBodyCell>1</TableBodyCell>
                        <TableBodyCell>13.01.2023</TableBodyCell>
                        <TableBodyCell>
                            «Демонтаж и ремонт тягового электродвигателя троллейбусов с увеличенным автономным ходом
                            производства»
                        </TableBodyCell>
                        <TableBodyCell>Скачать</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow onClick={handleOpenEditing}>
                        <TableBodyCell>1</TableBodyCell>
                        <TableBodyCell>13.01.2023</TableBodyCell>
                        <TableBodyCell>
                            «Демонтаж и ремонт тягового электродвигателя троллейбусов с увеличенным автономным ходом
                            производства»
                        </TableBodyCell>
                        <TableBodyCell>Скачать</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow onClick={handleOpenEditing}>
                        <TableBodyCell>1</TableBodyCell>
                        <TableBodyCell>13.01.2023</TableBodyCell>
                        <TableBodyCell>
                            «Демонтаж и ремонт тягового электродвигателя троллейбусов с увеличенным автономным ходом
                            производства»
                        </TableBodyCell>
                        <TableBodyCell>Скачать</TableBodyCell>
                    </TableBodyRow>
                </tbody>
            </Table>
            <Pagination className="materials__pagination" />
        </div>
    );
};

export default Materials;

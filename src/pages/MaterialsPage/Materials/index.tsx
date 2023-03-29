import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditMaterialModal from "../../../components/modals/materials/EditMaterialModal";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import { useMaterialsContext } from "../../../context/materialsContext";
import { downloadFile } from "../../../helpers/downloadFile";
import { formatDate } from "../../../helpers/formatDate";
import useLockedBody from "../../../hooks/useLockedBody";
import { IMaterial } from "../../../models/Material";
import MaterialService from "../../../services/MaterialService";

import "./styles.scss";

const LIMIT = 20;

const Materials: React.FC = () => {
    const [editingMaterial, setEditingMaterial] = React.useState<IMaterial | null>(null);
    useLockedBody(!!editingMaterial);

    const { divisionId = "" } = useParams();

    const { materials, setMaterials } = useMaterialsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        setIsLoading(true);
        setError(null);
        setMaterials([]);

        const fetchMaterials = async () => {
            try {
                const response = await MaterialService.fetch(divisionId, {
                    params: {
                        page,
                        size: LIMIT,
                    },
                    cancelToken: cancelToken.token,
                });
                console.log(response);
                const materials: IMaterial[] = response.data.map(({ lessonId, date, topic, fileName }) => ({
                    lessonId,
                    date,
                    topic,
                    fileName,
                }));
                console.log(materials);
                const totalPlans = response.headers["content_count"];
                const totalPages = totalPlans ? Math.ceil(totalPlans / LIMIT) : 1;
                setMaterials(materials);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMaterials();

        return () => cancelToken.cancel();
    }, [page, setMaterials, divisionId]);

    const handleOpenEditing = (event: React.MouseEvent<HTMLTableRowElement>, material: IMaterial) => {
        event.stopPropagation();
        setEditingMaterial(material);
    };

    const handleDownLoadMaterials = async (event: React.MouseEvent, fileName: string) => {
        event.stopPropagation();
        try {
            const response = await MaterialService.fetchFile({ depId: divisionId, fileName });
            console.log(response);
            downloadFile(response.data, fileName);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    return (
        <div className="materials">
            {!!editingMaterial && (
                <EditMaterialModal material={editingMaterial} closeModal={() => setEditingMaterial(null)} />
            )}
            <div className="materials__table-wrapper">
                <Table className="materials__table">
                    <TableHead>
                        <TableHeadCell>Номер занятия</TableHeadCell>
                        <TableHeadCell>Дата проведения</TableHeadCell>
                        <TableHeadCell>Тема занятия</TableHeadCell>
                        <TableHeadCell>Материалы</TableHeadCell>
                    </TableHead>
                    <tbody>
                        {materials.map((material) => (
                            <TableBodyRow
                                key={material.fileName}
                                onClick={(event) => handleOpenEditing(event, material)}
                            >
                                <TableBodyCell>{material.lessonId}</TableBodyCell>
                                <TableBodyCell>{formatDate(material.date)}</TableBodyCell>
                                <TableBodyCell>{material.topic}</TableBodyCell>
                                <TableBodyCell onClick={(event) => handleDownLoadMaterials(event, material.fileName)}>
                                    Скачать
                                </TableBodyCell>
                            </TableBodyRow>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Pagination
                className="materials__pagination"
                pageCount={totalPages}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={() => null}
            />
        </div>
    );
};

export default Materials;

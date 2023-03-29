import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditDepartmentModal from "../../../components/modals/departments/EditDepartmentModal";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import { useDepartmentsContext } from "../../../context/departmentsContext";
import useLockedBody from "../../../hooks/useLockedBody";
import { IDepartment } from "../../../models/Department";
import DepartmentService from "../../../services/DepartmentService";

import "./styles.scss";

const Departments: React.FC = () => {
    const [editingDepartment, setEditingDepartment] = useState<IDepartment | null>(null);
    useLockedBody(!!editingDepartment);

    const { divisionId = "" } = useParams();

    const { departments, setDepartments } = useDepartmentsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        setIsLoading(true);
        setError(null);
        setDepartments([]);

        const fetchPlans = async () => {
            try {
                const response = await DepartmentService.fetch(divisionId, {
                    cancelToken: cancelToken.token,
                });
                console.log(response);
                setDepartments(response.data);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();

        return () => cancelToken.cancel();
    }, [divisionId, setDepartments]);

    const handleOpenEditing = (event: React.MouseEvent<HTMLTableRowElement>, department: IDepartment) => {
        event.stopPropagation();
        setEditingDepartment(department);
    };

    return (
        <div className="departments">
            {editingDepartment && (
                <EditDepartmentModal closeModal={() => setEditingDepartment(null)} department={editingDepartment} />
            )}
            <div className="departments__table-wrapper">
                <Table className="departments__table">
                    <TableHead>
                        <TableHeadCell>Номер отдела</TableHeadCell>
                        <TableHeadCell>Название отдела</TableHeadCell>
                    </TableHead>
                    <tbody>
                        {departments.map((dep) => (
                            <TableBodyRow key={dep.id} onClick={(event) => handleOpenEditing(event, dep)}>
                                <TableBodyCell>{dep.id}</TableBodyCell>
                                <TableBodyCell>{dep.name}</TableBodyCell>
                            </TableBodyRow>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Departments;

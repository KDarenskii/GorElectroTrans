import React, { useState, useEffect, FC } from "react";
import EditStudentModal from "../../../components/modals/students/EditStudentModal";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import useLockedBody from "../../../hooks/useLockedBody";
import { IStudent } from "../../../models/Student";
import StudentsService from "../../../services/StudentService";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStudentsContext } from "../../../context/studentsContext";

import "./styles.scss";

const LIMIT = 20;

const StudentsComponent: FC = () => {
    const [editingStudent, setEditingStudent] = useState<IStudent | null>(null);
    useLockedBody(!!editingStudent);

    const { divisionId = "" } = useParams();

    const { students, setStudents } = useStudentsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        setIsLoading(true);
        setError(null);
        setStudents([]);

        const fetchStudents = async () => {
            try {
                const response = await StudentsService.fetch(divisionId, {
                    params: {
                        page,
                        size: LIMIT,
                    },
                    cancelToken: cancelToken.token,
                });
                console.log(response);
                const totalStudents = response.headers["students_count"];
                console.log(totalStudents);
                const totalPages = totalStudents ? Math.ceil(totalStudents / LIMIT) : 1;
                setStudents(response.data);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();

        return () => cancelToken.cancel();
    }, [page, setStudents, divisionId]);

    const handleOpenEditing = (event: React.MouseEvent<HTMLTableRowElement>, student: IStudent) => {
        event.stopPropagation();
        setEditingStudent(student);
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
    };

    return (
        <div className="students">
            {editingStudent && <EditStudentModal closeModal={() => setEditingStudent(null)} student={editingStudent} />}
            <div className="students__table-wrapper">
                <Table className="students__table">
                    <TableHead>
                        <TableHeadCell>Табельный номер</TableHeadCell>
                        <TableHeadCell>Фамилия И.О</TableHeadCell>
                        <TableHeadCell>Отдел</TableHeadCell>
                    </TableHead>
                    <tbody>
                        {!error &&
                            !isLoading &&
                            students.map((student) => (
                                <TableBodyRow
                                    key={student.studentId}
                                    onClick={(event) => handleOpenEditing(event, student)}
                                >
                                    <TableBodyCell>{student.studentId}</TableBodyCell>
                                    <TableBodyCell>{student.fullName}</TableBodyCell>
                                    <TableBodyCell>{student.subdepartmentName}</TableBodyCell>
                                </TableBodyRow>
                            ))}
                    </tbody>
                </Table>
            </div>
            <Pagination
                className="students__pagination"
                pageCount={totalPages}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={() => null}
            />
        </div>
    );
};

export default StudentsComponent;

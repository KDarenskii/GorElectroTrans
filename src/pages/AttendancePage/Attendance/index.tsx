import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditAttendanceModal from "../../../components/modals/attendance/EditAttendanceModal";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import { ATTENDACE_RESULT_VALUE } from "../../../constants/attendanceResult";
import { useAttendanceContext } from "../../../context/attendanceContext";
import { formatDate } from "../../../helpers/formatDate";
import useLockedBody from "../../../hooks/useLockedBody";
import { IAttendance } from "../../../models/Attendance";
import AttendanceService from "../../../services/AttendanceService";

import "./styles.scss";

const LIMIT = 20;

const Attendance: React.FC = () => {
    const [editingAttendance, setEditingAttendance] = React.useState<IAttendance | null>(null);
    useLockedBody(!!editingAttendance);

    const { divisionId = "" } = useParams();

    const { attendances, setAttendances } = useAttendanceContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        setIsLoading(true);
        setError(null);
        setAttendances([]);

        const fetchAttendance = async () => {
            try {
                const response = await AttendanceService.fetch(divisionId, {
                    params: {
                        page,
                        size: LIMIT,
                    },
                    cancelToken: cancelToken.token,
                });
                console.log(response);
                const totalPlans = response.headers["attendance_count"];
                const totalPages = totalPlans ? Math.ceil(totalPlans / LIMIT) : 1;
                setAttendances(response.data);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttendance();

        return () => cancelToken.cancel();
    }, [page, setAttendances, divisionId]);

    const handleOpenEditing = (event: React.MouseEvent<HTMLTableRowElement>, attendace: IAttendance) => {
        event.stopPropagation();
        setEditingAttendance(attendace);
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
    };

    return (
        <div className="attendance">
            {editingAttendance && (
                <EditAttendanceModal closeEditing={() => setEditingAttendance(null)} attendance={editingAttendance} />
            )}
            <div className="attendance__table-wrapper">
                <Table className="attendance__table">
                    <TableHead>
                        <TableHeadCell>Номер занятия</TableHeadCell>
                        <TableHeadCell>Фамилия И.О</TableHeadCell>
                        <TableHeadCell>Кол-во часов</TableHeadCell>
                        <TableHeadCell>Дата</TableHeadCell>
                        <TableHeadCell>Зачет/Незачет</TableHeadCell>
                        <TableHeadCell>Тема занятия</TableHeadCell>
                        <TableHeadCell>Отдел</TableHeadCell>
                        <TableHeadCell>Преподаватель</TableHeadCell>
                    </TableHead>
                    <tbody>
                        {attendances.map((attendance) => (
                            <TableBodyRow
                                key={`${attendance.studentId}${attendance.lessonId}`}
                                onClick={(event) => handleOpenEditing(event, attendance)}
                            >
                                <TableBodyCell>{attendance.lessonId}</TableBodyCell>
                                <TableBodyCell>{attendance.name}</TableBodyCell>
                                <TableBodyCell>{attendance.duration}</TableBodyCell>
                                <TableBodyCell>{formatDate(attendance.date)}</TableBodyCell>
                                <TableBodyCell>{ATTENDACE_RESULT_VALUE[attendance.success]}</TableBodyCell>
                                <TableBodyCell>{attendance.topic}</TableBodyCell>
                                <TableBodyCell>{attendance.subDepartment}</TableBodyCell>
                                <TableBodyCell>{attendance.teacher}</TableBodyCell>
                            </TableBodyRow>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Pagination
                className="attendance__pagination"
                pageCount={totalPages}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={() => null}
            />
        </div>
    );
};

export default Attendance;

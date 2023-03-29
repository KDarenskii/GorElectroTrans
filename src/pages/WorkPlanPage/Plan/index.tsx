import React, { useState, MouseEvent, useEffect } from "react";
import Table from "../../../components/Table";
import TableBodyRow from "../../../components/Table/TableBodyRow";
import TableBodyCell from "../../../components/Table/TableBodyRow/TableBodyCell";
import TableHead from "../../../components/Table/TableHead";
import TableHeadCell from "../../../components/Table/TableHead/TableHeadCell";
import Pagination from "../../../components/Pagination";
import EditPlanModal from "../../../components/modals/plans/EditPlanModal";
import useLockedBody from "../../../hooks/useLockedBody";
import axios from "axios";
import PlanService from "../../../services/PlanService";
import { IPlan } from "../../../models/Plan";
import { formatDate } from "../../../helpers/formatDate";
import Alert from "../../../components/Alert";
import { ALERT } from "../../../constants/alertTypes";
import { usePlansContext } from "../../../context/plansContext";
import { useParams } from "react-router-dom";

import "./styles.scss";

const LIMIT = 20;

const Plan: React.FC = () => {
    const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);
    useLockedBody(!!editingPlan);

    const { divisionId = "" } = useParams();

    const { plans, setPlans } = usePlansContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        setIsLoading(true);
        setError(null);
        setPlans([]);

        const fetchPlans = async () => {
            try {
                const response = await PlanService.fetch(divisionId, {
                    params: {
                        page,
                        size: LIMIT,
                    },
                    cancelToken: cancelToken.token,
                });
                console.log(response);
                const totalPlans = response.headers["lessons_count"];
                const totalPages = totalPlans ? Math.ceil(totalPlans / LIMIT) : 1;
                setPlans(response.data);
                setTotalPages(totalPages);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();

        return () => cancelToken.cancel();
    }, [page, setPlans, divisionId]);

    const handleOpenEditing = (event: MouseEvent<HTMLTableRowElement>, plan: IPlan) => {
        event.stopPropagation();
        setEditingPlan(plan);
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
    };

    return (
        <div className="plan">
            {!!editingPlan && <EditPlanModal closeEditing={() => setEditingPlan(null)} plan={editingPlan} />}
            {error && <Alert type={ALERT.ERROR}>{error}</Alert>}
            {!error && (
                <div className="plan__table-wrapper">
                    <Table className="plan__table">
                        <TableHead>
                            <TableHeadCell>Номер занятия</TableHeadCell>
                            <TableHeadCell>Дата</TableHeadCell>
                            <TableHeadCell>Длительность занятия</TableHeadCell>
                            <TableHeadCell>Кол-во обучающихся</TableHeadCell>
                            <TableHeadCell>Тема занятия</TableHeadCell>
                            <TableHeadCell>Преподаватель</TableHeadCell>
                        </TableHead>
                        <tbody>
                            {!error &&
                                plans.map((plan) => (
                                    <TableBodyRow key={plan.id} onClick={(event) => handleOpenEditing(event, plan)}>
                                        <TableBodyCell>{plan.id}</TableBodyCell>
                                        <TableBodyCell>{formatDate(plan.date)}</TableBodyCell>
                                        <TableBodyCell>{plan.duration}</TableBodyCell>
                                        <TableBodyCell>{plan.peoplePlanned}</TableBodyCell>
                                        <TableBodyCell>{plan.topic}</TableBodyCell>
                                        <TableBodyCell>{plan.teacher}</TableBodyCell>
                                    </TableBodyRow>
                                ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Pagination
                className="plan__pagination"
                pageCount={totalPages}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={() => null}
            />
        </div>
    );
};

export default Plan;

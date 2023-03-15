import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    ATTENDANCE_ROUTE,
    DEPARTMENTS_ROUTE,
    DIVISIONS_ROUTE,
    LOGIN_ROUTE,
    MATERIALS_ROUTE,
    STUDENTS_ROUTE,
    WORK_PLAN_ROUTE,
} from "../constants/routesPathnames";
import AttendancePage from "../pages/AttendancePage";
import DepartmentsPage from "../pages/DepartmentsPage";
import DivisionsPage from "../pages/DivisionsPage";
import LoginPage from "../pages/LoginPage";
import MaterialsPage from "../pages/MaterialsPage";
import StudentsPage from "../pages/StudentsPage";
import WorkPlanPage from "../pages/WorkPlanPage";
import MainLayout from "./layouts/MainLayout";
import MenuLayout from "./layouts/MenuLayout";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={LOGIN_ROUTE} element={<MainLayout />}>
                <Route index element={<LoginPage />} />
                <Route path={DIVISIONS_ROUTE} element={<DivisionsPage />} />
                <Route element={<MenuLayout />}>
                    <Route path={WORK_PLAN_ROUTE} element={<WorkPlanPage />} />
                    <Route path={STUDENTS_ROUTE} element={<StudentsPage />} />
                    <Route path={DEPARTMENTS_ROUTE} element={<DepartmentsPage />} />
                    <Route path={ATTENDANCE_ROUTE} element={<AttendancePage />} />
                    <Route path={MATERIALS_ROUTE} element={<MaterialsPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ATTENDANCE_ROUTE, DEPARTMENTS_ROUTE, MATERIALS_ROUTE, STUDENTS_ROUTE } from "../constants/routesPathnames";
import AttendancePage from "../pages/AttendancePage";
import DepartmentsPage from "../pages/DepartmentsPage";
import MaterialsPage from "../pages/MaterialsPage";
import StudentsPage from "../pages/StudentsPage";
import WorkPlanPage from "../pages/WorkPlanPage";
import MainLayout from "./layouts/MainLayout";
import MenuLayout from "./layouts/MenuLayout";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route element={<MenuLayout />}>
                    <Route index element={<WorkPlanPage />} />
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

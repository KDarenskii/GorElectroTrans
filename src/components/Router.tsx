import React from "react";
import { Routes, Route } from "react-router-dom";
import { STUDENTS_ROUTE } from "../constants/routesPathnames";
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
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;

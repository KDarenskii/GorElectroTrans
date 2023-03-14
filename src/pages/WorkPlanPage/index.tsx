import React from "react";
import Search from "../../components/Search";
import SectionHeader from "../../components/SectionHeader";
import WorkPlan from "./WorkPlan";

import "./styles.scss";
import NewWorkPlan from "./NewWorkPlan";

const WorkPlanPage: React.FC = () => {
    return (
        <div className="work-plan-page">
            <section className="work-plan-page__info">
                <SectionHeader title="Рабочий план" subtitle="ОСП «Трамвайный парк №1»" />
                <div className="work-plan-page__wrapper">
                    <Search />
                    <NewWorkPlan />
                </div>
                <WorkPlan />
            </section>
        </div>
    );
};

export default WorkPlanPage;

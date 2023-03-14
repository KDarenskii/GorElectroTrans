import React from "react";
import Search from "../../components/Search";
import SectionHeader from "../../components/SectionHeader";
import Materials from "./Materials";
import NewMaterial from "./NewMaterial";

import "./styles.scss";

const MaterialsPage: React.FC = () => {
    return (
        <div className="departments-page">
            <section className="departments-page__info">
                <SectionHeader title="Учебные материалы" subtitle="ОСП «Трамвайный парк №1»" />
                <div className="departments-page__wrapper">
                    <Search />
                    <NewMaterial />
                </div>
                <Materials />
            </section>
        </div>
    );
};

export default MaterialsPage;

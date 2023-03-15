import React from "react";
import DivisionsItem from "./DivisionsItem";

import "./styles.scss";

const divisionsNames = [
    "ОСП «Трамвайный парк №1»",
    "ОСП «Трамвайный парк №3»",
    "ОСП «Трамвайный парк №5»",
    "ОСП «Трамвайный парк №7»",
    "ОСП «Трамвайный парк №8»",
    "ОСП «Совмещенный трамвайно-троллейбусный парк»",
    "ОСП «Троллейбусный парк №1»",
    "ОСП «Троллейбусный парк №2»",
    "ОСП «Троллейбусный парк №3»",
    "ОСП «Троллейбусный парк №6»",
    "СП «Служба подвижного состава»",
    "ОСП «Служба движения»",
    "ОСП «Служба пути»",
    "ОСП «Аварийно-восстановительное хозяйство «Носорог»",
    "ОСП «Энергохозяйство»",
];

const Divisions: React.FC = () => {
    return (
        <ul className="divisions">
            {divisionsNames.map((name, index) => (
                <DivisionsItem key={name + index} name={name} />
            ))}
        </ul>
    );
};

export default Divisions;

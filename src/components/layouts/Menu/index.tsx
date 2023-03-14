import React from "react";
import { Link } from "react-router-dom";
import {
    ATTENDANCE_ROUTE,
    DEPARTMENTS_ROUTE,
    MATERIALS_ROUTE,
    REPORT_ROUTE,
    STUDENTS_ROUTE,
    WORK_PLAN_ROUTE,
} from "../../../constants/routesPathnames";
import cn from "classnames";

import "./styles.scss";

type Props = {
    className?: string;
};

const links = [
    { title: "Студенты", path: STUDENTS_ROUTE },
    { title: "Рабочий план", path: WORK_PLAN_ROUTE },
    { title: "Журнал посещаемости", path: ATTENDANCE_ROUTE },
    { title: "Учебные материалы", path: MATERIALS_ROUTE },
    { title: "Отделы", path: DEPARTMENTS_ROUTE },
    { title: "Отчетность", path: REPORT_ROUTE },
];

const Menu: React.FC<Props> = ({ className }) => {
    const [activeLink, setActiveLink] = React.useState(links[0].path);

    return (
        <nav className={cn("menu", className)}>
            <ul className="menu__list">
                {links.map((link) => (
                    <li className="menu__item" key={link.path} onClick={() => setActiveLink(link.path)}>
                        <Link
                            className={cn("menu__link", { "menu__link--active": activeLink === link.path })}
                            to={link.path}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;

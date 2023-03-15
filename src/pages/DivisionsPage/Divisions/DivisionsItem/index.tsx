import React from "react";
import { Link } from "react-router-dom";
import { WORK_PLAN_ROUTE } from "../../../../constants/routesPathnames";

import "./styles.scss";

type Props = {
    name: string;
};

const DivisionsItem: React.FC<Props> = ({ name }) => {
    return (
        <li className="divisions-item">
            <Link className="divisions-item__link" to={WORK_PLAN_ROUTE}>
                <h5 className="divisions-item__title">{name}</h5>
            </Link>
        </li>
    );
};

export default DivisionsItem;

import React from "react";

import "./styles.scss";

type Props = {
    children: React.ReactNode;
};

const TableBodyCell: React.FC<Props> = ({ children }) => {
    return <td className="table-body-cell">{children}</td>;
};

export default TableBodyCell;

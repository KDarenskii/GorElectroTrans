import React from "react";

import "./styles.scss";

type Props = {
    children: React.ReactNode;
};

const ModalLayout = React.forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    return (
        <div className="modal-layout">
            <div ref={ref} className="modal-layout__body">
                {children}
            </div>
        </div>
    );
});

export default ModalLayout;

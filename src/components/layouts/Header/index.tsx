import React from "react";
import logoSrc from "../../../assets/img/logo.svg";
import Container from "../../Container";

import "./styles.scss";

const Header: React.FC = () => {
    return (
        <header className="header">
            <Container>
                <img className="header__logo" src={logoSrc} alt="Logo" />
            </Container>
        </header>
    );
};

export default Header;

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    height: 64px;
`;
const Wrap = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Logo = styled.h1``;
const Gnb = styled.ul`
    display: flex;
`;
const GnbItem = styled.li`
    padding-left: 16px;
`;

const Header = () => {
    return (
        <SHeader>
            <Wrap>
                <Logo><FontAwesomeIcon icon={faInstagram} size="2x" /></Logo>
                <Gnb>
                    <GnbItem>
                        <Link to="/"><FontAwesomeIcon icon={faHome} size="1x" /></Link>
                    </GnbItem>
                    <GnbItem>
                        <Link to="/"><FontAwesomeIcon icon={faSearch} size="1x" /></Link>
                    </GnbItem>
                    <GnbItem>
                        <Link to="/"><FontAwesomeIcon icon={faUser} size="1x" /></Link>
                    </GnbItem>
                </Gnb>
            </Wrap>
        </SHeader>
    )
}

export default Header;
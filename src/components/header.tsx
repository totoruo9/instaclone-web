import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";

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

const Button = styled.span`
    background: ${props => props.theme.accent};
    border-radius: 4px;
    padding: 4px 16px;
    color: #fff;
    font-weight: 600;
`;

const Header = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const loggedInUser = useUser();
    return (
        <SHeader>
            <Wrap>
                <Logo><FontAwesomeIcon icon={faInstagram} size="2x" /></Logo>
                <Gnb>
                    {
                        isLoggedIn
                            ?<>
                                <GnbItem>
                                    <Link to="/"><FontAwesomeIcon icon={faHome} size="lg" /></Link>
                                </GnbItem>
                                <GnbItem>
                                    <Link to="/"><FontAwesomeIcon icon={faCompass} size="lg" /></Link>
                                </GnbItem>
                                <GnbItem>
                                    <Link to="/"><FontAwesomeIcon icon={faUser} size="lg" /></Link>
                                </GnbItem>
                            </>
                            : <Link to={routes.home}><Button>Login</Button></Link>
                    }
                </Gnb>
            </Wrap>
        </SHeader>
    )
}

export default Header;  
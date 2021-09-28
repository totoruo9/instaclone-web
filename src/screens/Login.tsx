import styled from "styled-components"
import { darkModeVar, isLoggedInVar } from "../apollo"

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
    background-color: ${props => props.theme.bgColor};
`;

const Login = () => {
    const toggleDark = darkModeVar();
    console.dir(toggleDark)
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
            <button onClick={() => darkModeVar(!toggleDark)}>darkmode</button>
        </Container>
    )
}

export default Login
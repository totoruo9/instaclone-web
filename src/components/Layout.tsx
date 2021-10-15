import styled from "styled-components"
import Header from "./Header"

const Content = styled.main`
    max-width: 930px;
    width: 100%;
    margin: 40px auto;
`;

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <Content>{children}</Content>
        </>
    )
}

export default Layout;
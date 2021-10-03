import {
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import { FatLink, LinkBtn } from "../components/shared";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/pageTitle";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const SubTitle = styled(FatLink)`
    text-align: center;
    margin-top: 8px;
    font-size: 16px;
    line-height: 20px;
`;

const SignUp = () => {
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <SubTitle>Sign up to see photos and videos from your friends</SubTitle>
                </HeaderContainer>
                <LinkBtn link="/" linkText="Log in with Facebook" />
                <Separator />
                <form>
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Sign up" />
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    )
}

export default SignUp
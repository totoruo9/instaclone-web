import styled from "styled-components"
import {
    faFacebookSquare,
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
import { useState } from "react";
import PageTitle from "../components/pageTitle";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const LogoArea = styled.div`
    margin-bottom: 35px;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("")
    const onUsernameChange = (event: any) => {
        setUsernameError("");
        setUsername(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if(username === ""){
            setUsernameError("Not empty pls")
        }
        if(username.length < 10){
            setUsernameError("too Short")
        }
    };

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <LogoArea>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </LogoArea>
                {usernameError}
                <form onSubmit={handleSubmit}>
                    <Input onChange={onUsernameChange} value={username} type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Log in" disabled={username === "" && username.length < 10} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    )
}

export default Login
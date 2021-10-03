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
import PageTitle from "../components/pageTitle";
import { useForm } from "react-hook-form";

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
    const {register, watch, handleSubmit} = useForm();
    const onSubmitValid = (data:any) => {
        console.log(data)
    }
    const onSubmitInvalid = (data:any) => {
        console.log(data, "invalid")
    }
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <LogoArea>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </LogoArea>
                <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                    <Input
                        {...register("username",
                            {required: "Username is required.",
                            minLength: 5,
                            validate: (currentValue) => currentValue.includes("potato")})
                        }
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        {...register("password", {required: "Password is required."})}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit" value="Log in" />
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
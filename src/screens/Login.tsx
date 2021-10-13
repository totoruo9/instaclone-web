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
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

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

interface IForm {
    username: string,
    password: string
}

const Login = () => {
    const {register, watch, handleSubmit, formState} = useForm<IForm>({
        mode: "onChange"
    });
    const onSubmitValid:SubmitHandler<IForm> = (data) => {
        console.log(data)
    }
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <LogoArea>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </LogoArea>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register
                            ("username",
                                {
                                    required: "Username is required.",
                                    minLength: {
                                        value: 5,
                                        message: "Username should be longer than 5 chars."
                                    }
                                }
                            )
                        }
                        name="username"
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState?.errors?.username?.message)}
                    />
                    <FormError message={formState?.errors?.username?.message} />
                    <Input
                        {...register("password", {required: "Password is required."})}
                        name="password"
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState?.errors?.password?.message)}
                    />
                    <FormError message={formState?.errors?.password?.message} />
                    <Button type="submit" value="Log in" disabled={!formState.isValid} />
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
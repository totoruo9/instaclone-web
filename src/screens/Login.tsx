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
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import FormAlert from "../components/auth/FormAlert";
import { login, loginVariables } from "../__generated__/login";

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
    password: string,
    result: string,
    login: {ok:boolean, error?: string, token?:string}
}

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!){
        login(username:$username, password:$password){
            ok
            token
            error
        }
    }
`;

const Login = () => {
    const location:any = useLocation();
    const {register, handleSubmit, formState, getValues, setError, clearErrors, trigger} = useForm<IForm>({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || ""
        }
    });
    const onCompleted = (data:login) => {
        const {login: {ok, error, token}} = data;
        if(!ok){
            setError("result", {message:error})
        }
        if(token){
            logUserIn(token);
        }
    }
    const [login, {loading}] = useMutation<login, loginVariables>(LOGIN_MUTATION, {
        onCompleted
    });
    const onSubmitValid:SubmitHandler<IForm> = (data) => {
        if(loading){
            return
        }
        const {username, password} = getValues();
        login({
            variables: {
                username,
                password
            }
        })
    }
    const clearLoginError = () => {
        if(formState.errors.result){
            clearErrors("result");
            trigger();
        }
    };
    return (
        <AuthLayout>
            <FormAlert message={location?.state?.message} color="#2ecc71" />
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
                        onFocus ={clearLoginError}
                    />
                    <FormError message={formState?.errors?.username?.message} />
                    <Input
                        {...register("password", {required: "Password is required."})}
                        name="password"
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState?.errors?.password?.message)}
                        onFocus ={clearLoginError}
                    />
                    <FormError message={formState?.errors?.password?.message} />
                    <Button type="submit" value={loading ? "Loading..." : "Login"} disabled={!formState.isValid || loading} />
                    <FormError message={formState?.errors?.result?.message} />
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
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
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { createAccount, createAccountVariables } from "../__generated__/createAccount";

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

interface SignForm {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
}

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ){
        createAccount(
            firstName:$firstName
            lastName:$lastName
            username:$username
            email:$email
            password:$password
        ){
            ok
            error
        }
    }
`;



const SignUp = () => {
    const history = useHistory();
    const onCompleted = (data:any) => {
        const {username, password} = getValues();
        const {createAccount:{ok, error}} = data;
        if(!ok){
            return;
        }
        history.push(routes.home, {message:"Account created. Please log in", username, password});
    };
    const [createAccount, {loading}] = useMutation<createAccount, createAccountVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });

    const {register, handleSubmit, formState, getValues} = useForm<SignForm>({
        mode:"onChange"
    });

    const onSubmitValid:SubmitHandler<SignForm> = (data) => {
        if(loading){
            return
        }
        createAccount({
            variables:{
                ...data
            }
        })
    }

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
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register(
                            "firstName",
                            {
                                required:"First Name is Reguired",
                            }
                        )}
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                    />
                    <FormError message={formState?.errors?.firstName?.message} />
                    <Input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                    />
                    <Input
                        {...register(
                            "email",
                            {
                                required:"Email is Reguired",
                            }
                        )}
                        type="text"
                        placeholder="Email"
                        name="email"
                    />
                    <FormError message={formState?.errors?.email?.message} />
                    <Input
                        {...register(
                            "username",
                            {
                                required:"Username is Reguired",
                            }
                        )}
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <FormError message={formState?.errors?.username?.message} />
                    <Input
                        {...register(
                            "password",
                            {
                                required:"Password is Reguired",
                            }
                        )}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <FormError message={formState?.errors?.password?.message} />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    )
}

export default SignUp
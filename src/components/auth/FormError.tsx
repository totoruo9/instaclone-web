import styled from "styled-components";

const SFormError = styled.span`
    color: #ff4a5b;
    font-weight: 600;
    font-size: 12px;
    margin: 5px 0 10px 0;
`;

const FormError = ({message}:any) => {
    return message === "" || !message ? null : <SFormError>{message}</SFormError>
}

export default FormError;
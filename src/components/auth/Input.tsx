import styled from "styled-components";

interface InputStyledProps {
    hasError?: boolean
}

const Input = styled.input<InputStyledProps>`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid ${props => props.hasError ? "#ff4a5b" : props.theme.borderColor};
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
    &:focus {
        border-color: rgb(38,38,38)
    }
`;

export default Input
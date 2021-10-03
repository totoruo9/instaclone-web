import styled from "styled-components";
import { InputProps } from "../../react-app-env";

const SButton = styled.input`
border: none;
margin-top: 12px;
background-color: ${props => props.theme.accent};
color: white;
text-align: center;
padding: 8px 0px;
font-weight: 600;
width: 100%;
`;

const Button = (props:InputProps) => {
    return <SButton {...props}/>
};

export default Button;
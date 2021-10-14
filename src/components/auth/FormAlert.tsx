import styled from "styled-components";

const SFormAlert = styled.div<FromAlert>`
    padding: 10px 20px;
    background: ${(props:any) => props.formAlertColor ? props.formAlertColor : "#333"};
    color: #fff;
    text-align:center;
    opacity:1;
    animation:fade-out 1s 2s;
    animation-fill-mode: forwards;

    @keyframes fade-out {
        from {
            opacity:1
        }
        to {
            opacity:0
        }
    }
`;

interface FromAlert {
    formAlertColor?: any
}

const FormAlert = ({message, color}:{message:string, color:string|null}) => 
    message
        ? <SFormAlert formAlertColor={color}>
            {message}
        </SFormAlert>
        : null


export default FormAlert
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BaseBox = styled.div`
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.borderColor};
    width: 100%;
`;

export const FatLink = styled.span`
    font-weight: 600;
    color: rgba(142,142,142);
`;

export const SLinkBtn = styled(Link)`
    margin-top: 12px;
    background-color: #0095f6;
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
    width: 100%;
    border-radius: 4px;
`;

export const LinkBtn = ({link, linkText}:any) => {
    return (
        <SLinkBtn to={link}>
            {linkText}
        </SLinkBtn>
    )
};
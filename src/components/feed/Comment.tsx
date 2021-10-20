import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
    a {
        background: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        text-decoration: underline;
        &:hover{
            text-decoration:none;
        }
    }
`;

interface IComment {
    author: string
    payload: string
}

const Comment:React.FC<IComment> = ({author, payload}) => {
    return (
        <SComment>
            <FatText>{author}</FatText>
            <CommentCaption>
                {
                    payload
                        .split(" ")
                        .map((word, index) =>
                            /#[\w]+/.test(word)
                                ? <React.Fragment key={index}><Link to={`/hashtags/${word}`}>{word}</Link>{" "}</React.Fragment>
                                : <React.Fragment key={index}>{word}{" "}</React.Fragment>
                        )
                }
            </CommentCaption>
        </SComment>
    )
}

export default Comment;
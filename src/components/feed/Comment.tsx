import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
`;

interface IComment {
    author: string
    payload: string
}

const Comment:React.FC<IComment> = ({author, payload}) => {
    return (
        <SComment>
            <FatText>{author}</FatText>
            <CommentCaption>{payload}</CommentCaption>
        </SComment>
    )
}

export default Comment;
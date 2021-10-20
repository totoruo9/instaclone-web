import * as sanitizeHtml from 'sanitize-html';
import styled from "styled-components";
import { FatText } from "../shared";

const SComment = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
    mark {
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
    const cleanPayload = sanitizeHtml(payload?.replace(/#[\w]+/g, "<mark>$&</mark>"), {allowedTags: ["mark"]});
    return (
        <SComment>
            <FatText>{author}</FatText>
            <CommentCaption
            dangerouslySetInnerHTML={
                {__html: cleanPayload}
                }
            />
        </SComment>
    )
}

export default Comment;
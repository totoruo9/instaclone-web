import styled from "styled-components";
import { FatText } from "../shared";
import Comment from "./Comment";

const SComments = styled.div`
    margin-top: 20px;
`;

const CommentCount = styled(FatText)`
    margin: 8px 0;
    display: block;
    opacity: .7;
    font-size: 12px;
`

interface IComments {
    author: string
    caption: string
    comments: [{
        id: number
        user: {
            username: string
            avatar?: string
        }
        payload: string
        isMine: boolean
        createAt: string
    }]
    commentNumber: number
}

const Comments:React.FC<IComments> = ({author, caption, comments, commentNumber}) => {
    return (
        <SComments>
            <Comment author={author} payload={caption} />
            <CommentCount>{commentNumber <= 1 ? `${commentNumber} comment` : `${commentNumber} comments`}</CommentCount>
            {comments?.map(comment => {
                return <Comment author={comment.user.username} key={comment.id} payload={comment.payload} />
            })}
        </SComments>
    )
}

export default Comments;
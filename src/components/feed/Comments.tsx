import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { isReturnStatement } from "typescript";
import useUser from "../../hooks/useUser";
import Input from "../auth/Input";
import { FatText } from "../shared";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId:$photoId, payload: $payload){
            ok
            error
            id
        }
    }
`;

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
    photoId: number
}

const Comments:React.FC<IComments> = ({author, caption, comments, commentNumber, photoId}) => {
    const {data: userData} = useUser();
    const createCommentUpdate = (cache, result) => {
        const {data: {createComment: {ok, id}}} = result;
        if(ok && userData?.me){
            const {payload} = getValues();
            setValue("payload", "");
            const newComment = {
                __typename:"Comment",
                createAt: Date.now()+"",
                id,
                isMine:true,
                payload,
                user: {...userData.me}
            };
            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment BSName on Comment {
                        id
                        createAt
                        isMine
                        payload
                        user {
                            username
                            avatar
                        }
                    }
                `
            });
            console.log(newCacheComment);
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    comments(prev){
                        return [...prev, newCacheComment];
                    },
                    commentNumber(prev){
                        return prev+1;
                    }
                }
            });
        }
    }
    const [createCommentMutation, {loading}] = useMutation(CREATE_COMMENT_MUTATION,{
        update: createCommentUpdate
    });
    const {register, handleSubmit, setValue, getValues} = useForm();
    const onValid = (data) => {
        const {payload} = data;
        if(loading){
            return;
        }
        createCommentMutation({
            variables: {
                photoId,
                payload
            }
        });
    }
    return (
        <SComments>
            <Comment author={author} payload={caption} />
            <CommentCount>{commentNumber <= 1 ? `${commentNumber} comment` : `${commentNumber} comments`}</CommentCount>
            {comments?.map(comment => {
                return <Comment author={comment.user.username} key={comment.id} payload={comment.payload} />
            })}
            <div>
                <form onSubmit={handleSubmit(onValid)}>
                    <Input
                        {...register(
                            "payload",
                            {required: true}
                        )}
                        name="payload"
                        type="text"
                        placeholder="Write a comment..."
                    />
                </form>
            </div>
        </SComments>
    )
}

export default Comments;
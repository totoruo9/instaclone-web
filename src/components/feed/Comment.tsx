import { gql, useMutation } from "@apollo/client";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!){
        deleteComment(id: $id){
            ok
        }
    }
`;

const SComment = styled.div`
    padding: 6px 0;
`;

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

const DeleteBtn = styled.button`
    border: none;
    background: none;
`;

interface IComment {
    author: string
    payload: string
    id?: number
    isMine?: boolean
    photoId?: number
}

const Comment:React.FC<IComment> = ({id, author, payload, isMine, photoId}) => {
    const updateDeleteComment = (cache, result) => {
        const {data: {deleteComment: {ok}}} = result;
        if(ok){
            cache.evict({id:`Comment:${id}`});
            cache.modify({
                id:`Photo:${photoId}`,
                fields: {
                    commentNumber(prev){
                        return prev-1;
                    }
                }
            })
        }
    }
    const [deletCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables:{id},
        update: updateDeleteComment
    });
    const onDeleteClick = () => {
        deletCommentMutation();
    }
    return (
        <SComment>
            <Link to={`/users/${author}`}><FatText>{author}</FatText></Link>
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
            {isMine ? <DeleteBtn onClick={onDeleteClick}><FontAwesomeIcon icon={faWindowClose} /></DeleteBtn> : null}
        </SComment>
    )
}

export default Comment;
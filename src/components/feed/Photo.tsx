import styled from "styled-components";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FatText } from "../shared";
import Avatar from "../Avatar";
import { gql, useMutation } from "@apollo/client";
import { toggleLike, toggleLikeVariables } from "../../__generated__/toggleLike";
import Comments from "./Comments";

interface IPhoto {
    id: number
    user: {
        avatar?: string
        username: string
    }
    file: string
    isLiked: boolean
    likes: number
    caption: string
    commentNumber: number
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
};

const PhotoContainer = styled.div`
    background: #fff;
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
    border-radius: 4px;
`;

const PhotoHeader = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
`;

const Username = styled(FatText)`
    margin-left: 16px;
`;

const PhotoFile = styled.img`
    width: 100%;
    min-width: 100%;
`;

const PhotoData = styled.div`
    padding: 16px;
`;

const PhotoActions = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    
    div {
        display:flex;
        align-items: center;
    }

    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div<{onClick?: any}>`
    margin-right: 10px;
    cursor:pointer;
`;

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
`;



const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id:Int!){
        toggleLike(id: $id){
            ok
            error
        }
    }
`;

// const Comments = styled.div`
//     margin-top: 20px;
// `;

// const Comment = styled.div``;

// const CommentCaption = styled.span`
//     margin-left: 10px;
// `;

// const CommentCount = styled(FatText)`
//     margin: 8px 0;
//     display: block;
//     opacity: .7;
//     font-size: 12px;
// `

const Photo:React.FC<IPhoto> = ({id, user, file, isLiked, likes, caption, commentNumber, comments}) => {
    const updateToggleLike = (cache, result) => {
        const {
            data:{
                toggleLike: {ok}
            }
        } = result;
        if(ok){
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
                fragment BSName on Photo {
                    isLiked,
                    likes
                }
            `;
            const result = cache.readFragment({
                id: fragmentId,
                fragment,
            });
            if("isLiked" in result && "likes" in result){
                const {isLiked:cacheIsLiked, likes:cacheLikes} = result;
                cache.writeFragment({
                    id: fragmentId,
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked ? cacheLikes -1 : cacheLikes + 1
                    }
                });
            }
        }
    };
    const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike
    });
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar url={user.avatar} lg={true} />
                <Username>{user.username}</Username>
            </PhotoHeader>
            <PhotoFile  src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                                <FontAwesomeIcon style={{color: isLiked ? "#ff4a5b" : "inherit"}} icon={isLiked ? SolidHeart : faHeart} />
                        </PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>

                <Likes>{likes <= 1 ? `${likes} like` : `${likes} likes`}</Likes>

                <Comments author={user.username} caption={caption} comments={comments} commentNumber={commentNumber} />
                {/* <Comments>
                    <Comment>
                        <FatText>{user.username}</FatText>
                        <CommentCaption>{caption}</CommentCaption>
                    </Comment>
                    <CommentCount>{commentNumber <= 1 ? `${commentNumber} comment` : `${commentNumber} comments`}</CommentCount>
                    {comments?.map(comment => {
                        return(
                            <Comment key={comment.id}>
                                <FatText>{comment.user.username}</FatText>
                                <CommentCaption>{comment.payload}</CommentCaption>
                            </Comment>
                        )
                    })}
                </Comments> */}
            </PhotoData>
        </PhotoContainer>
    )
}

export default Photo;
import { gql, useQuery } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import routes from "../routes";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            comments
            createAt
            isMine
        }
    }
`;

const PhotoContainer = styled.div`
    background: #fff;
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
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
`;

const PhotoAction = styled.div`
    margin-right: 10px;
`;

const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
`;

const Home = () => {
    const history = useHistory();
    history.replace(routes.home, null);

    const {data} = useQuery(FEED_QUERY);

    return (
        <>
            {data?.seeFeed?.map(photo => {
                return <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar url={photo.user.avatar} lg={true} />
                        <Username>{photo.user.username}</Username>
                    </PhotoHeader>
                    <PhotoFile  src={photo.file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction><FontAwesomeIcon size={"lg"} icon={faHeart} /></PhotoAction>
                                <PhotoAction><FontAwesomeIcon size={"lg"} icon={faComment} /></PhotoAction>
                                <PhotoAction><FontAwesomeIcon size={"lg"} icon={faPaperPlane} /></PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon size={"lg"} icon={faBookmark} />
                            </div>
                        </PhotoActions>
                        <Likes>{photo.likes <= 1 ? `${photo.likes} like` : `${photo.likes} likes`}</Likes>
                    </PhotoData>
                </PhotoContainer>
            })}
            <button onClick={() => logUserOut()}>Log out now!</button>
        </>
    );
}

export default Home;
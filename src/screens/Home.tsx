import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/pageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import routes from "../routes";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const Home = () => {
    const history = useHistory();
    history.replace(routes.home, null);

    const {data} = useQuery(FEED_QUERY);

    return (
        <>
            <PageTitle title="Home" />
            {data?.seeFeed?.map(photo => {
                return (
                    <Photo key={photo.id} {...photo} />
                )
            })}
            <button onClick={() => logUserOut()}>Log out now!</button>
        </>
    );
}

export default Home;
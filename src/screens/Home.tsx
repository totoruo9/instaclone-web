import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";
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
            isLiked
        }
    }
`;

const Home = () => {
    const history = useHistory();
    history.replace(routes.home, null);

    const {data} = useQuery(FEED_QUERY);

    return (
        <>
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
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
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

const Home = () => {
    const history = useHistory();
    history.replace(routes.home, null);

    const {data} = useQuery(FEED_QUERY);
    console.log(data);

    return (
        <>
            <h1>Wellcome we did it!</h1>
            <button onClick={() => logUserOut()}>Log out now!</button>
        </>
    );
}

export default Home;
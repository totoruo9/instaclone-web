import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import routes from "../routes";

const Home = () => {
    const history = useHistory();

    history.replace(routes.home, null)

    return (
        <>
            <h1>Wellcome we did it!</h1>
            <button onClick={() => logUserOut()}>Log out now!</button>
        </>
    );
}

export default Home;
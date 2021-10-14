import { logUserOut } from "../apollo";

const Home = () => {

    return (
        <>
            <h1>Wellcome we did it!</h1>
            <button onClick={() => logUserOut("token")}>Log out now!</button>
        </>
    );
}

export default Home;
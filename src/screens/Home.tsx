import { isLoggedInVar } from "../apollo";

const Home = () => {

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
        </>
    );
}

export default Home;
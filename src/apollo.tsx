import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";
import { useHistory } from "react-router-dom";

const TOKEN = "token"
const localToken = Boolean(localStorage.getItem(TOKEN));


export const isLoggedInVar = makeVar(localToken);
export const logUserIn = (token:string) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});
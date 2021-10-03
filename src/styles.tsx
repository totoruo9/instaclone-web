import { createGlobalStyle, DefaultTheme } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    borderColor: "rgb(219,219,219)",

}

export const darkTheme = {
    fontColor: "#eaeaea",
    bgColor: "#fff"
}

export const GlogalStyles = createGlobalStyle`
    ${reset}
    body{
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: rgb(38,38,38);
    }
    *{
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
`;
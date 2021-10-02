import { createGlobalStyle, DefaultTheme } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
    fontColor: "#fff",
    bgColor: "#eaeaea"
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
    }
    *{
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
`;
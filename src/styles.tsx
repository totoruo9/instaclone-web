import { createGlobalStyle, DefaultTheme } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38,38,38)",
    borderColor: "rgb(219,219,219)",

}

export const darkTheme = {
    fontColor: "#FAFAFA",
    bgColor: "rgb(38,38,38)"
}

export const GlogalStyles = createGlobalStyle`
    ${reset}
    body{
        background-color: ${props => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: ${props => props.theme.fontColor};
    }
    *{
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
`;
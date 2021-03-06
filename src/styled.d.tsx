import { StringDecoder } from "string_decoder";
import "styled-components";

declare module "styled-components"{
    export interface DefaultTheme{
        bgColor?: string
        fontColor?: string
        accent?: string
        borderColor?: string
        lg?: boolean
    }
}
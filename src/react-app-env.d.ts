/// <reference types="react-scripts" />

export type Props = {
    children: React.ReactNode
}

export type InputProps = {
    type: string;
    value?: string;
    placeholder?: string;
    hasError?: boolean;
    name?: string;
}

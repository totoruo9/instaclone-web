import styled from "styled-components"

interface IAvatar {
    url:string
    lg?: boolean
}

const SAvatar = styled.div<{lg: boolean}>`
    width: ${props => props.lg ? "28px" : "18px"};
    height: ${props => props.lg ? "28px" : "18px"};
    border-radius: 50%;
    background-color: #333;
    overflow: hidden;
`;

const Img = styled.img`
    height:100%;
    width: 100%;
`;

const Avatar:React.FC<IAvatar> = ({url = "", lg=false}) => {
    return <SAvatar lg={lg}>
        {url !== null ? <Img src={url} alt="avatar" /> : null}
    </SAvatar>
}

export default Avatar;
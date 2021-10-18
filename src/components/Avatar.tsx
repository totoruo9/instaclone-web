import styled from "styled-components"

const SAvatar = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 15px;
    background-color: #333;
`;

const Img = styled.img`
    max-width: 100%;
`;

const Avatar = ({url = ""}) => {
    return <SAvatar>
        {url !== null ? <Img src={url} alt="avatar" /> : null}
    </SAvatar>
}

export default Avatar;
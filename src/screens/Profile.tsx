import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";

interface ProfileParams {
    username: string
}

interface SeeProfileType {
    seeProfile: {
        avatar: string
        bio: string
        firstName: string
        id: number
        isFollowing: boolean
        isMe: boolean
        lastName: string
        photos: any
        totalFollowers: number
        totalFollowing: number
        email: string
    }
}

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username:String!){
        seeProfile(username: $username){
            id
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isFollowing
            isMe
            email
        }
    }
    ${PHOTO_FRAGMENT}
`;

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

const ProfileAvatar = styled.div<{avatarBg: string}>`
    width: 150px;
    height: 150px;
    margin: 20px 40px;
    overflow: hidden;
    border-radius: 50%;
    background: ${props => props.avatarBg ? `url(${props.avatarBg}) center top` : "#333"};
    background-size: cover;
`;

const InfoWrap = styled.div`
    
`;

const Username = styled.h2`
    font-size: 28px;
    font-weight: 600;
`;

const FollowWrap = styled.div`
    display: flex;
    padding: 20px 0;
`;

const FollowItem = styled.div`
    padding-right: 20px;
`;

const Bio = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

const Email = styled.span`
    display: block;
    margin-top: 16px;
    font-size: 12px;
    color: #767676;
`;

const UserPhotoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
`;

const PhotoItem = styled.div<{photoBg:string}>`
    background: ${props => `url(${props.photoBg}) center`};
    background-size: cover;
    width: 32%;
    height: 300px;
    margin: .65%;
    border-radius: 4px;
    transition: .2s;
    cursor: pointer;
    &:after {
        content:"";
        display: block;
        padding-bottom: 100%;
    }
    &:hover {
        opacity: .35;
    }
`;

const NotImgMessage = styled.p`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 40px 0 ;
    font-size: 12px;
    color: #767676;
`;

const Profile = () => {
    const {username}:ProfileParams = useParams();
    const {data} = useQuery(SEE_PROFILE_QUERY, {
        variables:{
            username
        }
    });

    if(data){
        const {
            seeProfile:{
                bio,
                avatar,
                id,
                firstName,
                lastName,
                totalFollowing,
                totalFollowers,
                isFollowing,
                isMe,
                photos,
                email
            }
        }:SeeProfileType = data;

        console.log(photos);
        return (
            <Layout>
                <ProfileContainer>
                    <ProfileAvatar avatarBg={avatar} />
                    <InfoWrap>
                        <Username>{username}</Username>
                        <FollowWrap>
                            <FollowItem><FatText>Followers</FatText> {totalFollowers}</FollowItem>
                            <FollowItem><FatText>Following</FatText> {totalFollowing}</FollowItem>
                        </FollowWrap>
                        <Bio>{bio ? bio : "Please enter your bio"}</Bio>
                        <Email>{email}</Email>
                    </InfoWrap>
                </ProfileContainer>
                <UserPhotoContainer>
                    {
                        photos && photos.length !== 0
                            ? photos.map(photo => {
                                return (
                                    <PhotoItem photoBg={photo.file} />
                                )
                            })
                            : <NotImgMessage>You are not upload images.</NotImgMessage>
                    }
                </UserPhotoContainer>
            </Layout>
        )
    }
    return null;
    
}

export default Profile;
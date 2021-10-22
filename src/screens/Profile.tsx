import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Layout from "../components/Layout";
import PageTitle from "../components/pageTitle";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

interface ProfileParams {
    username: string
};

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
};

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username: String!) {
        followUser(username:$username) {
            ok
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($username: String!) {
        unfollowUser(username:$username) {
            ok
        }
    }
`;

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

const UserWrap = styled.div`
    display: flex;
`;

const Username = styled.h2`
    font-size: 28px;
    font-weight: 600;
`;

const UserStateBtn = styled(Button).attrs({
    as: "span"
})<{onClick?:any}>`
    margin: 0 0 0 16px;
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
    const {data:userData} = useUser();
    const {data, loading} = useQuery(SEE_PROFILE_QUERY, {
        variables:{
            username
        }
    });
    const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables:{
            username
        },
        refetchQueries: [{query: SEE_PROFILE_QUERY, variables: {username}}, {query: SEE_PROFILE_QUERY, variables:{username: userData?.me?.username}}]
    });
    const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
        variables:{
            username
        },
        refetchQueries: [{query: SEE_PROFILE_QUERY, variables: {username}}, {query: SEE_PROFILE_QUERY, variables:{username: userData?.me?.username}}]
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

        return (
            <Layout>
                <PageTitle title={loading ? "Loading..." : `${username}'s Profile`} />
                <ProfileContainer>
                    <ProfileAvatar avatarBg={avatar} />
                    <InfoWrap>
                        <UserWrap>
                            <Username>{username}</Username>
                            {
                                isMe
                                    ? <UserStateBtn>Edit Profile</UserStateBtn>
                                    : <UserStateBtn onClick={
                                        isFollowing ? unfollowUserMutation : followUserMutation
                                    }>
                                        {isFollowing ? "Unfollow" : "Follow"}
                                    </UserStateBtn>
                            }
                            
                        </UserWrap>
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
                                    <PhotoItem key={photo.id} photoBg={photo.file} />
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
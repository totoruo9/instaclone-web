import { useParams } from "react-router-dom";

const Profile = () => {
    const params = useParams();
    console.log(params);
    return <>"Profile"</>
}

export default Profile;
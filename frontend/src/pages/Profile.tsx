import AppBar from '../components/AppBar'
import ProfileComp from '../components/ProfileComp'

const Profile = () => {
    return (
        <div>
            <AppBar />
            <ProfileComp
                name="Jane Doe"
                bio="A software engineer with a love for problem-solving."
                location="New York, NY"
                joinDate="March 2023"
            />

            

        </div>
    )
}

export default Profile

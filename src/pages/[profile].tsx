import { NextPage } from "next"
import { useRouter } from "next/router"
import Home from "./index"

const Profile: NextPage = () => {
    const router = useRouter()
    const { profile } = router.query
    return <Home profile={profile?.toString().toLowerCase()} />
}

export default Profile

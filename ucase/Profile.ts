import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile/profile-user"

const ProfileApi = {
    async getAllData () {
        const token = await getData()
        return Main().get(endPoint, {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default ProfileApi
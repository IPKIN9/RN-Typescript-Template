import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile/doctor"

const DoctorApi = {
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

export default DoctorApi
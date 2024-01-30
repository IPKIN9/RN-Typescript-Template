import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile/check-avaible"

const VisitApi = {
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

export default VisitApi
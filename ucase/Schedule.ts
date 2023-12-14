import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile/schedule"
interface endPointParamsInterface {
    dokter_id: number | string | null
    today: string | null
}
const ScheduleApi = {
    
    async getAllData (params: endPointParamsInterface) {
        const token = await getData()
        
        return Main().get(`${endPoint}?dokter_id=${params.dokter_id}?today=${params.today}`, {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default ScheduleApi
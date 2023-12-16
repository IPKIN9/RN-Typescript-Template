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
        console.log(params);
        
        return Main().get(`${endPoint}?today=${params.today}`, {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default ScheduleApi
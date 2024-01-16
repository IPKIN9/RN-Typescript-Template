import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile/schedule"
interface endPointParamsInterface {
    today: string | null
}
const ScheduleApi = {
    
    async getAllData (params: endPointParamsInterface) {
        const token = await getData()
        console.log(params);
        
        return Main().get(`${endPoint}?today=${params.today?.toLocaleLowerCase()}`, {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default ScheduleApi
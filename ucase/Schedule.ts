import Main from './Main'

const endPoint: string = "/api/mobile/schedule"
interface endPointParamsInterface {
    dokter_id: number | string | null
    today: string | null
}
const ScheduleApi = {
    getAllData (params: endPointParamsInterface) {
        return Main().get(`${endPoint}?dokter_id=${params.dokter_id}?today=${params.today}`)
    }
}

export default ScheduleApi
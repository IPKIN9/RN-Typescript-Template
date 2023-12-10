import Main from './Main'

const endPoint: string = "/api/mobile/schedule"

const ScheduleApi = {
    getAllData () {
        return Main().get(endPoint)
    }
}

export default ScheduleApi
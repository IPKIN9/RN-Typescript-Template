import Main from './Main'

const endPoint: string = "/api/mobile/schedule"

const Api = {
    getAllData: async () => {
        return Main().get(endPoint)
    }
}

export default Api
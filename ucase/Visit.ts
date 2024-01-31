import Main from './Main'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/api/mobile"

interface IRegist {
    poly_id: number
}

const VisitApi = {
    async getAllData () {
        const token = await getData()
        return Main().get(endPoint + '/check-avaible', {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    },

    async regist (payload: IRegist) {
        const token = await getData()
        return Main().post(endPoint + '/visiting', payload, {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default VisitApi
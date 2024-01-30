import Main from './Main'
import { ILoginPayload } from '../store/LoginContextState'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/oauth/token"
const secretId: string = "9b377d2d-7ba8-4408-933e-b6436e97e2db"
const seceretClient: string = "1rmhRJmxY4zvOQYfCQOSlMvNQiSfgxAH1481gDKH"

interface ICompletePayload {
    grant_type: string
    client_id: string,
    client_secret: string,
    username: string,
    password: string,
    scope: string | null
}

const LoginApi = {
    postData (payload: ILoginPayload) {
        const completePayload: ICompletePayload = {
            client_id: secretId,
            client_secret: seceretClient,
            grant_type: "password",
            username: payload.username,
            password: payload.password,
            scope: ""
        }

        return Main().post(endPoint, completePayload, {
            headers: {
                Accept: 'application/json'
            }
        })
    },

    async flashData () {
        const token = await getData()
        return Main().get('/api/mobile/logout', {
            headers:{
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}

export default LoginApi
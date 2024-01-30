import Main from './Main'
import { ILoginPayload } from '../store/LoginContextState'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/oauth/token"
const secretId: string = "9b378c6a-1880-44b0-b19c-927e876bb7e6"
const seceretClient: string = "4ZMwjIx0JzxuWMDnoDgsWl4cgZkV86428eX3DOq7"

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
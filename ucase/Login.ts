import Main from './Main'
import { ILoginPayload } from '../store/LoginContextState'
import { getData } from '../util/TokenConfig'

const endPoint: string = "/oauth/token"
const secretId: string = "9b0158e9-f899-4bba-9f1e-e45a1e2175db"
const seceretClient: string = "3rOG0p5YtqaORXL3QFzUzTLEchfYyBxG4Oi1uyl5"

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
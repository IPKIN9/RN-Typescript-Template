import Main from './Main'
import { ILoginPayload } from '../store/LoginContextState'

const endPoint: string = "/oauth/token"
const secretId: string = "9addf207-91d7-4ecd-8669-adaec49874de"
const seceretClient: string = "w1rapie9wOWfcXf0Q2GIh6M1sPAnRzIVsyDheFkJ"

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
    }
}

export default LoginApi
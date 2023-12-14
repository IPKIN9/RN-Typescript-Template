import Main from './Main'
import { ILoginPayload } from '../store/LoginContextState'

const endPoint: string = "/oauth/token"
const secretId: string = "9ad5d2cc-b49f-4956-b6fa-e692d9f8889a"
const seceretClient: string = "JzLLiKBsE9oFpEtP77OE8hIjWszODLiuzcfUtiiG"

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
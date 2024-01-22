import Main from './Main'

const endPoint: string = "/api/mobile/getImageText"
type FormDataObject = FormData;

const RegisterApi = {
    async getKtpData (formData: FormDataObject) {
        return Main().post(endPoint, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    async registerUser (formData: FormDataObject) {
        return Main().post(endPoint, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    },
}

export default RegisterApi
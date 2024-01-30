import Main from './Main'

const endPoint: string = "/api/mobile/getImageText"
type FormDataObject = FormData;

interface IFormData {
    nik: string;
    email: string;
    password: string;
    password_confirmation: string;
    nama: string;
    alamat: string;
    jk: string; // Pilihan jenis kelamin
    agama: string;
    status_nikah: number; // Pilihan status nikah (0: Belum Menikah, 1: Menikah, 2: Duda/Janda)
    pekerjaan: string;
    kewarganegaraan: string;
}

const RegisterApi = {
    async getKtpData (formData: FormDataObject) {
        return Main().post(endPoint, formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    async registerUser (formData: IFormData) {
        return Main().post('/api/mobile/member-registration', formData, {
            headers:{
                Accept: 'application/json'
            }
        })
    },
}

export default RegisterApi
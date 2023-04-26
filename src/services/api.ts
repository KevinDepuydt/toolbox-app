import axios, { Axios, AxiosResponse } from 'axios'

export class ApiService {
  private api: Axios
  private formApi: Axios

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
    })

    this.formApi = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async compressImage(image: Image): Promise<AxiosResponse> {
    const form = new FormData()
    form.append('image', image.inputFile)
    return this.formApi.post('/image-compress', form)
  }
}

const service = new ApiService()

export default service

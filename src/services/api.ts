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

  async compressImage(image: ImageState): Promise<AxiosResponse> {
    const form = new FormData()
    form.append('image', image.inputFile)
    return this.formApi.post('/image-compress', form)
  }

  async convertImage(image: ImageConvertState): Promise<AxiosResponse> {
    const form = new FormData()
    form.append('image', image.inputFile)
    form.append('outputFormat', image.outputFormat as string)
    return this.formApi.post('/image-convert', form)
  }
}

const service = new ApiService()

export default service

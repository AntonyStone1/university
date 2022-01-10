/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import axios, { AxiosResponse } from 'axios'

type RestOptions = {
  method: string
}
type ConfigOptions = {
  url: string
  headers?: any
  params?: any
  data?: any
  restOptions?: RestOptions
}
type BaseHeaders = {
  Accept: string
  'Content-Type': string
}

type CallApi = {
  headers?: Record<string, string>
  params?: Record<string, string>
  data?: any
  options?: {
    method: string
  }
}

let baseEndpoint: string = ''

const getBaseHeaders = (): BaseHeaders => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export const setBaseEndpoint = (ep: string) => {
  baseEndpoint = ep
}

const callApi = async (
  url: string,
  { headers = {}, params = {}, data, options }: CallApi,
): Promise<any> => {
  const config = {
    url,
    headers: { ...getBaseHeaders(), ...headers },
    params: { ...params },
    data,

    ...options,
  }
  let hasError = false
  if (options === undefined) {
    console.log('restOptions - undefined')
  } else if (options.method === 'POST' && !config.data) {
    config.data = {}
  }

  const request = async (conf: ConfigOptions): Promise<any> => {
    const responseData: boolean | AxiosResponse<any, any> = await axios
      .request(conf)
      .catch(() => (hasError = true))

    if (typeof responseData === 'boolean') {
      console.log(hasError)
      return request(conf)
    }
    if (responseData.status === 200) {
      return responseData
    }
  }
  const responseData = request(config)
  return responseData
}

export default {
  get: (url: string, options?: any) => callApi(url, { ...options, method: 'GET' }),
  post: (url: string, options?: any) => callApi(url, { ...options, method: 'POST' }),
  put: (url: string, options?: any) => callApi(url, { ...options, method: 'PUT' }),
  delete: (url: string, options?: any) => callApi(url, { ...options, method: 'DELETE' }),
}

import config from '../../config.json'
import ICharacter from '../../models/character'
export interface RequestData {
  url: string
  endPoint: string
  method?: string
  jsonBody?: any
  contentType?: string
  formBody?: any
}

export interface ResponseData {
  results: Array<any>
  info: Array<ICharacter>
}

export interface ResponseRequest<TResult> {
  onSuccess: (result: TResult) => void
  onError?: (error: Response) => void
}

class Api {
  config_env = config

  getCharacter = async (
    data: string,
    page: number,
    response: ResponseRequest<ResponseData>
  ) => {
    await this.request(
      {
        url: this.config_env.urlApi,
        endPoint: '/character/?name=' + data + '&page=' + page,
        method: 'GET',
      },
      response
    )
  }

  getLocation = async (
    page: number,
    response: ResponseRequest<ResponseData>
  ) => {
    await this.request(
      {
        url: this.config_env.urlApi,
        endPoint: '/location/?page=' + page,
        method: 'GET',
      },
      response
    )
  }

  request = async <TResult>(
    { url, endPoint, method, jsonBody, contentType, formBody }: RequestData,
    { onSuccess, onError }: ResponseRequest<TResult>
  ) => {
    try {
      const headers = new Headers()
      headers.append('pragma', 'no-cache')
      headers.append('cache-control', 'no-cache')
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append(
        'Content-Type',
        contentType ? contentType : 'application/json'
      )
      headers.append(
        'Accept',
        'application/json, application/xml, text/plain, text/html, multipart/form-data, *.*'
      )
      const options: RequestInit = {
        method: method,
        headers,
      }

      if (jsonBody) {
        const bodyStr = JSON.stringify(jsonBody)
        options.body = bodyStr
      }

      if (formBody) {
        options.body = formBody
      }

      const request = fetch(url + endPoint, options)
      const response = await request

      if (response.ok) {
        const content = await response.json()

        if (content) {
          onSuccess(content)
        }
      } else {
        const content = response
        if (!onError) return
        onError(content)
      }
    } catch (error) {
      if (!onError) return
      onError(error)
    }
  }
}

export default Api

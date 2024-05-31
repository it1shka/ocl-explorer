export type CodeExample = {
  name: string
  js: string
  ocl: string
}

const isCodeExample = (source: any): source is CodeExample => {
  return source instanceof Object   &&
    typeof source.name === 'string' &&
    typeof source.js   === 'string' &&
    typeof source.ocl  === 'string'
}

const isStringList = (source: any): source is string[] => {
  if (!(source instanceof Array)) return false
  if (source.length <= 0) return true
  return typeof source[0] === 'string'
}

const checkResponseStatus = async (response: Response) => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message)
  }
}

class API {
  private readonly baseUrl: string
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  verifyOnServer = async (js: string, ocl: string) => {
    const response = await fetch(`${this.baseUrl}/verify`, {
      method: 'POST',
      body: JSON.stringify({ js, ocl })
    })
    await checkResponseStatus(response)
    const result = await response.text()
    return result
  }

  fetchRandomExample = async () => {
    const response = await fetch(`${this.baseUrl}/example/random`)
    await checkResponseStatus(response)
    const maybeCodeExample = await response.json()
    if (!isCodeExample(maybeCodeExample)) {
      throw new Error('Wrong API response format: expected code example')
    }
    return maybeCodeExample
  }

  fetchExampleList = async () => {
    const response = await fetch(`${this.baseUrl}/example/list`)
    await checkResponseStatus(response)
    const maybeExampleList = await response.json()
    if (!isStringList(maybeExampleList)) {
      throw new Error('Wrong API response format: expected string list')
    }
    return maybeExampleList
  }

  fetchParticularExample = async (example: string) => {
    const params = new URLSearchParams({ example }).toString()
    const response = await fetch(`${this.baseUrl}/example/get?${params}`)
    await checkResponseStatus(response)
    const maybeCodeExample = await response.json()
    if (!isCodeExample(maybeCodeExample)) {
      throw new Error('Wrong API response format: expected code example')
    }
    return maybeCodeExample
  }
}

const api = new API('http://localhost:3057')
export default api

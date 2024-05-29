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

class API {
  private readonly baseUrl: string
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  verifyOnServer = async (jsCode: string, oclCode: string) => {
    // TODO: 
  }

  fetchRandomExample = async () => {
    const response = await fetch(`${this.baseUrl}/example`)
    const maybeCodeExample = await response.json()
    if (!isCodeExample(maybeCodeExample)) {
      throw new Error('Wrong API response format')
    }
    return maybeCodeExample
  }
}

export default new API('http://localhost:3057')

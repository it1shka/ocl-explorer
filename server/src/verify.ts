import type { Request, Response } from 'express'
import { ScriptTarget, transpile } from 'typescript'

type CodeBody = {
  js: string
  ocl: string
}

const checkBody = (body: any): body is CodeBody => {
  const { js, ocl } = body
  return typeof js === 'string' &&
    typeof ocl === 'string'
}

const prepareJS = (code: string) => {
  return transpile(code, {
    strict: false,
    allowJs: true,
    target: ScriptTarget.ES3
  })
}

const getMessage = (error: unknown) => {
  return error instanceof Error
    ? error.message
    : String(error)
}

// TODO: 
const verifyHandler = (req: Request, res: Response) => {
  if (!checkBody(req.body)) {
    res.status(400).send('Expected fields for javascript and ocl code')
    return
  }
  try {
    const js = prepareJS(req.body.js)
    res.send(js)
  } catch (error) {
    res.send(getMessage(error))
  }
}

export default verifyHandler

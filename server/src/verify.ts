import type { Request, Response } from 'express'
import { ScriptTarget, transpile } from 'typescript'
import { OclEngine  } from '@stekoe/ocl.js'
import { Isolate } from 'isolated-vm'

const getMessage = (error: unknown) => {
  return error instanceof Error
    ? error.message
    : String(error)
}

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
  try {
    return transpile(code, {
      strict: false,
      allowJs: true,
      target: ScriptTarget.ES3
    })
  } catch (error) {
    throw new Error(`JS/TS Error: ${getMessage(error)}`)
  }
}

const prepareOCLEngine = (code: string) => {
  try {
    const engine = OclEngine.create()
    engine.addOclExpression(code)
    return engine
  } catch (error) {
    throw new Error(`OCL Error: ${getMessage(error)}`)
  }
}

type OclResult = ReturnType<OclEngine['evaluate']>

// TODO: IMPORTANT potential hack threat
// TODO: not working, rebuild
const runEngineAgainstCode = (engine: OclEngine, code: string) => {
  try {
    const results = new Array<OclResult>()
    const isolate = new Isolate({ 
      memoryLimit: 8,
      onCatastrophicError: () => {
        throw new Error('Fatal crash, most likely due to memory limit')
      }
    })
    const context = isolate.createContextSync()
    const jail = context.global
    jail.setSync('OCL', jail.derefInto())
    jail.setSync('verify', (...args: unknown[]) => {
      if (args.length <= 0) return
      const result = engine.evaluate(args[0])
      results.push(result)
    })
    const compiledJS = isolate.compileScriptSync(code)
    compiledJS.runSync(context)
    return results
  } catch (error) {
    throw new Error(`Runtime Error: ${getMessage(error)}`)
  }
}

// TODO: maybe add new line
const resultsToString = (results: OclResult[]) => {
  return results
    .map((result, index) => {
      const failedContexts = result.getNamesOfFailedInvs()
      if (failedContexts.length <= 0) {
        return `Verification #${index}: passed`
      }
      const failed = failedContexts.join(', ')
      return `Verification $${index}: failed ${failed}`
    })
    .join('; ')
}

// TODO: 
const verifyHandler = (req: Request, res: Response) => {
  if (!checkBody(req.body)) {
    res.status(400).send('Expected fields for javascript and ocl code')
    return
  }
  try {
    const js = prepareJS(req.body.js)
    const oclEngine = prepareOCLEngine(req.body.ocl)
    const results = runEngineAgainstCode(oclEngine, js)
    const response = resultsToString(results)
    res.send(response)
  } catch (error) {
    res.send(getMessage(error))
  }
}

export default verifyHandler

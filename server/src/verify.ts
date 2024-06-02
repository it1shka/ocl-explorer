import type { Request, Response } from 'express'
import { ScriptTarget, transpile } from 'typescript'
import { Isolate } from 'isolated-vm'
import { OclEngine } from '@stekoe/ocl.js'
import { rollup } from 'rollup'
import virtual from '@rollup/plugin-virtual'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

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

const prepareSourceCode = (code: string) => {
  try {
    return transpile(code, {
      strict: false,
      allowJs: true,
      target: ScriptTarget.ES2019
    })
  } catch (error) {
    throw new Error(`TS Compiler Error: ${getMessage(error)}`)
  }
}

const verifyOCL = (code: string) => {
  try {
    OclEngine.create().addOclExpression(code)
  } catch (error) {
    throw new Error(`OCL Error: ${getMessage(error)}`)
  }
}

const prepareBundle = async (js: string, ocl: string) => {
  const script = `
    import { OclEngine } from '@stekoe/ocl.js';
    const verify = (() => {
      const engine = OclEngine.create();
      engine.addOclExpression(\`${ocl}\`);
      let index = 0;
      return (obj) => {
        const result = engine.evaluate(obj);
        const evalCtxAmount = result.getEvaluatedContexts().length.toString()
        const idx = String(index++);
        const messageStart = 'Verification #' + idx + ': evaluated ' + evalCtxAmount + ' context(s), '
        if (result.getResult()) {
          external.log(messageStart + 'passed');
          return;
        }
        const failed = result.getNamesOfFailedInvs().join(', ');
        external.log(messageStart + failed + ' failed');
      }
    })();

    ${js}
  `
  try {
    const build = await rollup({
      input: 'script',
      plugins: [ 
        nodeResolve(),
        commonjs(),
        json(),
        virtual({ script }),
      ],
    })
    const output = await build.generate({
      format: 'iife'
    })
    return output.output[0].code
  } catch (error) {
    throw new Error(`Bundler Error: ${getMessage(error)}`)
  }
}

const runBundle = async (bundle: string) => {
  try {
    const logs = new Array<string>()
    const logFunction = (...args: unknown[]) => {
      logs.push(...args.map(String))
    }
    const isolate = new Isolate({ 
      memoryLimit: 8,
      onCatastrophicError: () => {
        throw new Error('Fatal crash (most likely due to memory lack)')
      }
    })
    const ctx = await isolate.createContext()
    const jail = ctx.global
    await jail.set('external', jail.derefInto())
    await jail.set('log', logFunction)
    const compiledScript = await isolate.compileScript(bundle)
    await compiledScript.run(ctx)
    return logs.join('\n')
  } catch (error) {
    throw new Error(`VM Error: ${getMessage(error)}`)
  }
}

const verifyHandler = async (req: Request, res: Response) => {
  if (!checkBody(req.body)) {
    res.status(400).send('Expected fields for javascript and ocl code')
    return
  }
  try {
    const { js, ocl } = req.body
    const sourceCode = prepareSourceCode(js)
    verifyOCL(ocl)
    const bundle = await prepareBundle(sourceCode, ocl)
    const result = await runBundle(bundle)
    res.send(result)
  } catch (error) {
    res.send(getMessage(error))
  }
}

export default verifyHandler

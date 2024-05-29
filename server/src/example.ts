import type { Request, Response } from 'express'
import {lstatSync, readFileSync, readdirSync} from 'fs'
import {extname, join} from 'path'

const EXAMPLES_DIR = 'examples'
const JS_EXTENSIONS = ['.js', '.mjs', '.cjs', '.ts']
const OCL_EXTENSION = '.ocl'

type Example = {
  name: string
  js: string
  ocl: string
}

const readExamples = () => {
  return readdirSync(EXAMPLES_DIR).map(filename => {
    const path = join(EXAMPLES_DIR, filename)
    if (!lstatSync(path).isDirectory()) {
      console.warn(`${path}: not a directory. Skip`)
      return null
    }
    const children = readdirSync(path)
    const jsFile = children.find(name => {
      const ext = extname(name)
      return JS_EXTENSIONS.includes(ext)
    })
    const oclFile = children.find(name => {
      const ext = extname(name)
      return ext === OCL_EXTENSION
    })
    if (!jsFile || !oclFile) {
      console.warn(`${path}: js or ocl file not detected. Skip`)
      return null
    }
    const js = readFileSync(join(path, jsFile), { encoding: 'utf-8' })
    const ocl = readFileSync(join(path, oclFile), { encoding: 'utf-8' })
    return {
      name: filename,
      js, ocl
    } satisfies Example
  }).filter((e): e is Example => Boolean(e))
}

const getRandomExample = (() => {
  const examples = readExamples()
  return () => {
    const index = ~~(Math.random() * examples.length)
    return examples[index]
  }
})()

const exampleHandler = (_: Request, res: Response) => {
  const example = getRandomExample()
  res.json(example)
}

export default exampleHandler

import type { Request, Response } from 'express'
import {lstatSync, readdirSync} from 'fs'
import {join} from 'path'

const EXAMPLES_DIR = 'examples'

type Example = {
  name: string
  js: string
  ocl: string
}

const readExamples = () => {
  return readdirSync(EXAMPLES_DIR).map(filename => {
    const path = join(EXAMPLES_DIR, filename)
    if (!lstatSync(path).isDirectory()) {
      return null
    }
    const children = readdirSync(path)
    
  }).filter(Boolean)

}

const examples = readExamples()

const exampleHandler = (req: Request, res: Response) => {

}

export default exampleHandler

import { memo, useCallback } from 'react'
import Button from './Button'
import {getFileExtension} from '../lib/strings'

type FileLoadProps = {
  onUpload: (content: string) => unknown
  onUploadError: (error: unknown) => unknown
  allowedExtensions?: string[]
  encoding?: string
}

const FileLoad = ({
  onUpload,
  onUploadError,
  allowedExtensions,
  encoding = 'utf-8',
}: FileLoadProps) => {
  const handleFileUpload = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.style.display = 'none'
    input.onchange = () => {
      if (!input.files || input.files.length <= 0) {
        onUploadError(new Error('No files were chosen'))
        return
      }
      const file = input.files[0]
      if (allowedExtensions) {
        const extension = getFileExtension(file.name)
        if (!allowedExtensions.includes(extension)) {
          const expectedExtensions = allowedExtensions
            .map(ext => `".${ext}"`)
            .join(', ')
          onUploadError(new Error(`Expected ${expectedExtensions}, found ".${extension}"`))
          return
        }
      }
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        if (typeof result !== 'string') {
          onUploadError('Unexpected reading result format')
          return
        }
        onUpload(result)
      }
      reader.onerror = () => {
        onUploadError(reader.error)
      }
      reader.onabort = () => {
        onUploadError(new Error(`Reading file "${file.name}" was aborted`))
      }
      reader.readAsText(file, encoding)
    }
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }, [onUpload, onUploadError, allowedExtensions, encoding])

  return <Button onClick={handleFileUpload}>Load</Button>
}

export default memo(FileLoad)

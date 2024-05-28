import { memo, useCallback } from 'react'
import Button from './Button'

type FileLoadProps = {
  onUpload: (content: string) => unknown
  onUploadError: (error: unknown) => unknown
  allowedExtensions?: string[]
}

const FileLoad = ({
  onUpload,
  onUploadError,
  allowedExtensions,
}: FileLoadProps) => {
  const handleFileUpload = useCallback(() => {
    const input = document.createElement('input')
    input.style.display = 'none'
    input.onchange = () => {

    }
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }, [onUpload, onUploadError, allowedExtensions])

  return <Button onClick={handleFileUpload}>Load</Button>
}

export default memo(FileLoad)

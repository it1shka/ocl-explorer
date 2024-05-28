import { memo, useCallback } from 'react'
import Button from './Button'

type FileSaveProps = {
  content: string
  filename: string | (() => string)
  encoding?: string
  mimeType?: string
}

const FileSave = ({
  content,
  filename,
  encoding = 'utf-8',
  mimeType = 'text/plain'
}: FileSaveProps) => {
  const handleSave = useCallback(() => {
    const link = document.createElement('a')
    const encodedContent = window.encodeURIComponent(content)
    link.href = `data:${mimeType};charset=${encoding},${encodedContent}`
    link.download = filename instanceof Function ? filename() : filename 
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [content, filename, encoding, mimeType])

  return (
    <Button 
      $active
      onClick={handleSave}
    >Save</Button>
  )
}

export default memo(FileSave)

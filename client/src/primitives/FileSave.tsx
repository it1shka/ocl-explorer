import { memo, useCallback } from 'react'
import Button from './Button'

type FileSaveProps = {
  content: string
  filename?: string
  extension?: string
}

const FileSave = ({
  content,
  filename,
  extension = 'txt',
}: FileSaveProps) => {
  const handleSave = useCallback(() => {
    // TODO: ...
  }, [content, filename, extension])

  return (
    <Button 
      $active
      onClick={handleSave}
    >Save</Button>
  )
}

export default memo(FileSave)

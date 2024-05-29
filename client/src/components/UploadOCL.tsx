import { memo, useCallback } from 'react'
import styled from 'styled-components'
import FileLoad from '../primitives/FileLoad'
import FileSave from '../primitives/FileSave'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {setOCLCode} from '../storage/editorOCL'
import useNotifications from '../lib/useNotifications'

const UploadOCL = () => {
  const code = useAppSelector(({ editorOCL }) => editorOCL.code)
  const dispatch = useAppDispatch()
  const setCode = useCallback((newCode: string) => {
    dispatch(setOCLCode(newCode))
  }, [dispatch])

  const { addNotification } = useNotifications()
  const handleUploadError = useCallback((error: unknown) => {
    const message = error instanceof Error
      ? error.message
      : String(error)
    addNotification({
      variant: 'error',
      title: 'Error while uploading file',
      message
    })
  }, [addNotification])

  const filename = useCallback(() => {
    const postfix = Date.now() % 1e6
    return `verif${postfix}.ocl`
  }, [])

  return (
    <Container>
      <FileLoad
        onUpload={setCode}
        onUploadError={handleUploadError}
        allowedExtensions={['ocl', 'oclstdlib', 'txt']}
      />
      <FileSave
        content={code}
        filename={filename}
        mimeType='application/ocl'
      />
    </Container>
  )
}

export default memo(UploadOCL)

const Container = styled.div`
  position: absolute;
  bottom: 10px; right: 10px;
  display: flex;
  & > * + * {
    margin-left: 6px;
  }
`

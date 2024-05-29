import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import FileLoad from '../primitives/FileLoad'
import FileSave from '../primitives/FileSave'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {setJSCode} from '../storage/editorJS'
import useNotifications from '../lib/useNotifications'

const UploadJS = () => {
  const { code, language } = useAppSelector(({ editorJS }) => editorJS)

  const dispatch = useAppDispatch()
  const setCode = useCallback((newCode: string) => {
    dispatch(setJSCode(newCode))
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
    return `source${postfix}.${language}`
  }, [language])

  const mimeType = useMemo(() => {
    return language === 'ts'
      ? 'application/typescript'
      : 'text/javascript'
  }, [language])

  return (
    <Container>
      <FileLoad
        onUpload={setCode}
        onUploadError={handleUploadError}
        allowedExtensions={['js', 'mjs', 'cjs', 'ts', 'txt']}
      />
      <FileSave
        content={code}
        filename={filename}
        mimeType={mimeType}
      />
    </Container>
  )
}

export default memo(UploadJS)

const Container = styled.div`
  position: absolute;
  bottom: 10px; right: 10px;
  display: flex;
  & > * + * {
    margin-left: 6px;
  }
`

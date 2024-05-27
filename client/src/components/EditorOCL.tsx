import { memo, useCallback } from 'react'
import styled from 'styled-components'
import Resizer from '../primitives/Resizer'
import CodeMirror from '@uiw/react-codemirror'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {setOCLCode} from '../storage/editorOCL'

const EditorOCL = () => {
  const { code } = useAppSelector(({ editorOCL }) => editorOCL)

  const dispatch = useAppDispatch()
  const handleCodeChange = useCallback((newCode: string) => {
    dispatch(setOCLCode(newCode))
  }, [dispatch])

  return (
    <Container>
      <Resizer>{({ width, height }) => (
        <CodeMirror
          value={code}
          onChange={handleCodeChange}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}</Resizer>
    </Container>
  )
}

export default memo(EditorOCL)

const Container = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`

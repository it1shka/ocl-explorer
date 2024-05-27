import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {setJSCode, setLanguage} from '../storage/editorJS'
import Resizer from '../primitives/Resizer'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Button from '../primitives/Button'
import {vim} from '@replit/codemirror-vim'

const EditorJS = () => {
  const { code, language } = useAppSelector(({ editorJS }) => editorJS)
  const { vimEnabled } = useAppSelector(({ global }) => global)
  const extensions = useMemo(() => [
    javascript({
      typescript: language === 'ts'
    }),
    ...(vimEnabled 
      ? [vim({ status: true })]
      : []
    ),
  ], [language, vimEnabled])

  const dispatch = useAppDispatch()
  const handleCodeChange = useCallback((newCode: string) => {
    dispatch(setJSCode(newCode))
  }, [dispatch])
  const handleSetJS = useCallback(() => {
    dispatch(setLanguage('js'))
  }, [dispatch])
  const handleSetTS = useCallback(() => {
    dispatch(setLanguage('ts'))
  }, [dispatch])

  return (
    <Container>
      <LanguagePick>
        <Button 
          onClick={handleSetJS} 
          $active={language === 'js'}
        >JS</Button>
        <Button 
          onClick={handleSetTS} 
          $active={language === 'ts'}
        >TS</Button>
      </LanguagePick>
      <Resizer>{({ width, height }) => (
        <CodeMirror
          value={code}
          onChange={handleCodeChange}
          extensions={extensions}
          width={`${width}px`}
          height={`${height}px`}
        />
      )}</Resizer>
    </Container>
  )
}

export default memo(EditorJS)

const LanguagePick = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px; right: 10px;
  display: flex;
  & > * + * {
    margin-left: 6px;
  }
`

const Container = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  border-right: 1px solid #ccc;
  position: relative;
`

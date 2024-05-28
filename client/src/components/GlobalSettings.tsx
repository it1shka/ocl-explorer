import { memo, useCallback, useEffect, useState } from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import Button from '../primitives/Button'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {decreaseFont, increaseFont, toggleVimMode} from '../storage/global'
import {setJSCode} from '../storage/editorJS'
import {setOCLCode} from '../storage/editorOCL'

const SHOW_FONT_DELTA = 750

const GlobalSettings = () => {
  const dispatch = useAppDispatch()

  // hacky way to update code mirror
  const { code: jsCode } = useAppSelector(({ editorJS }) => editorJS)
  const { code: oclCode } = useAppSelector(({ editorOCL }) => editorOCL)
  const forceUpdate = useCallback(() => {
    dispatch(setJSCode(''))
    dispatch(setOCLCode(''))
    setTimeout(() => {
      dispatch(setJSCode(jsCode))
      dispatch(setOCLCode(oclCode))
    }, 0)
  }, [dispatch, jsCode, oclCode])

  const handleFontInc = useCallback(() => {
    dispatch(increaseFont())
    forceUpdate()
  }, [dispatch, forceUpdate])
  const handleFontDec = useCallback(() => {
    dispatch(decreaseFont())
    forceUpdate()
  }, [dispatch, forceUpdate])

  const { vimEnabled } = useAppSelector(({ global }) => global)
  const handleToggleVim = useCallback(() => {
    dispatch(toggleVimMode())
  }, [dispatch])

  const { fontSize } = useAppSelector(({ global }) => global)
  const [showFontSize, setShowFontSize] = useState(false)
  useEffect(() => {
    setShowFontSize(true)
    const timer = setTimeout(() => {
      setShowFontSize(false)
    }, SHOW_FONT_DELTA)
    return () => clearTimeout(timer)
  }, [fontSize])

  return (
    <Container>
      {showFontSize && <FontSize>{fontSize}px</FontSize>}
      <Button onClick={handleFontInc}>{'+'}</Button>
      <Button onClick={handleFontDec}>{'-'}</Button>
      <Button 
        $active={vimEnabled} 
        onClick={handleToggleVim}
      >VIM</Button>
    <GlobalStyle $fontSize={fontSize} />
    </Container>
  )
}

export default memo(GlobalSettings)

const GlobalStyle = createGlobalStyle<{
  $fontSize: number
}>`
  .cm-editor, .cm-gutters {
    font-size: ${({ $fontSize }) => $fontSize}px;
  }
`

const FontSize = styled.p``

const Container = styled.div`
  position: fixed;
  top: 10px; right: 10px;
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 6px;
  }
`

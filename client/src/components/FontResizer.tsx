import { memo, useEffect } from 'react'
import {createGlobalStyle} from 'styled-components'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {toggleVimMode} from '../storage/global'

const FontResizer = () => {
  const { fontSize } = useAppSelector(({ global }) => global)

  // hack that forces CodeMirror to update
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(toggleVimMode())
    setTimeout(() => {
      dispatch(toggleVimMode())
    }, 0)
  }, [fontSize, dispatch])

  return <GlobalStyle $fontSize={fontSize} />
}

export default memo(FontResizer)

const GlobalStyle = createGlobalStyle<{
  $fontSize: number
}>`
  .cm-editor, .cm-gutters {
    font-size: ${({ $fontSize }) => $fontSize}px;
  }
`

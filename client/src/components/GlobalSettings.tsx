import { memo, useCallback } from 'react'
import styled from 'styled-components'
import Button from '../primitives/Button'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {decreaseFont, increaseFont, toggleVimMode} from '../storage/global'

const GlobalSettings = () => {
  const dispatch = useAppDispatch()

  const handleFontInc = useCallback(() => {
    dispatch(increaseFont())
  }, [dispatch])
  const handleFontDec = useCallback(() => {
    dispatch(decreaseFont())
  }, [dispatch])

  const { vimEnabled } = useAppSelector(({ global }) => global)
  const handleToggleVim = useCallback(() => {
    dispatch(toggleVimMode())
  }, [dispatch])

  return (
    <Container>
      <Button onClick={handleFontInc}>{'+'}</Button>
      <Button onClick={handleFontDec}>{'-'}</Button>
      <Button 
        $active={vimEnabled} 
        onClick={handleToggleVim}
      >VIM</Button>
    </Container>
  )
}

export default memo(GlobalSettings)

const Container = styled.div`
  position: fixed;
  top: 10px; right: 10px;
  display: flex;
  & > * + * {
    margin-left: 6px;
  }
`

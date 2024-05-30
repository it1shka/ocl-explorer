import { memo } from 'react'
import styled from 'styled-components'
import RandomExample from './RandomExample'
import RunOCL from './RunOCL'
import ClearConsole from './ClearConsole'

const Controls = () => {
  return (
    <Container>
      <RunOCL />
      <RandomExample />
      <ClearConsole />
    </Container>
  )
}

export default memo(Controls)

const Container = styled.div`
  width: 200px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  & > * + * {
    margin-top: 0.5em;
  }
`

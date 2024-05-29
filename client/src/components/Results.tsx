import { memo } from 'react'
import styled from 'styled-components'
import {useAppSelector} from '../storage/hooks'

const Results = () => {
  const jsCode = useAppSelector(({ editorJS }) => editorJS.code)
  const oclCode = useAppSelector(({ editorOCL }) => editorOCL.code)

  return (
    <Container>
      <VerifyButton>
        Verify
      </VerifyButton>
    </Container>
  )
}

export default memo(Results)

const VerifyButton = styled.button`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background-color: #66bb6a;
  color: white;
  padding: 0.25em 1em;
  font-size: 1.25em;
  border-radius: 0 0 12px 12px;
  &:hover {
    background-color: #388e3c;
  }
`

const Container = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  border-top: 1px solid #ccc;
  position: relative;
`

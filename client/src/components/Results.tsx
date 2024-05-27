import { memo } from 'react'
import styled from 'styled-components'

const Results = () => {
  return (
    <Container>
    </Container>
  )
}

export default memo(Results)

const Container = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  border-top: 1px solid #ccc;
`

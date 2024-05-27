import { memo } from 'react'
import styled from 'styled-components'
import EditorJS from './components/EditorJS'
import EditorOCL from './components/EditorOCL'
import Results from './components/Results'
import GlobalSettings from './components/GlobalSettings'
import FontResizer from './components/FontResizer'

const App = () => {
  return (
    <Container>
      <EditorJS />
      <EditorOCL />
      <Results />
      <GlobalSettings />
      <FontResizer />
    </Container>
  )
}

export default memo(App)

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 300px;
  grid-template-columns: 1fr 1fr;
`

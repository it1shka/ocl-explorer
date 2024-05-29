import { memo, useEffect } from 'react'
import styled from 'styled-components'
import EditorJS from './components/EditorJS'
import EditorOCL from './components/EditorOCL'
import Results from './components/Results'
import GlobalSettings from './components/GlobalSettings'
import Notifications from './components/Notifications'

import useNotifications from './lib/useNotifications'
import {choice} from './lib/arrays'

const App = () => {
  const { addNotification } = useNotifications()
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      addNotification({
        variant: choice(['message', 'warning', 'error', 'success']),
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'
      })
    }
  }, [addNotification])

  return (
    <Container>
      <Notifications />
      <EditorJS />
      <EditorOCL />
      <Results />
      <GlobalSettings />
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

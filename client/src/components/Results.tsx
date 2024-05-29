import { memo, useCallback } from 'react'
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import Button from '../primitives/Button'
import useNotifications from '../lib/useNotifications'
import API from '../lib/api'
import {setJSCode} from '../storage/editorJS'
import {setOCLCode} from '../storage/editorOCL'

// TODO: 

const Results = () => {
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications()

  const jsCode = useAppSelector(({ editorJS }) => editorJS.code)
  const oclCode = useAppSelector(({ editorOCL }) => editorOCL.code)

  // TODO: maybe replace with asyncThunk
  const handleRandomExample = useCallback(async () => {
    try {
      const { name, js, ocl } = await API.fetchRandomExample()
      dispatch(setJSCode(js))
      dispatch(setOCLCode(ocl))
      addNotification({
        variant: 'success',
        title: `Example "${name}"`,
      })
    } catch (error) {
      // TODO: extract into a separate function
      const message = error instanceof Error
        ? error.message
        : String(error)
      addNotification({
        variant: 'error',
        title: 'Failed to load code example',
        message
      })
    }
  }, [dispatch, addNotification])

  return (
    <Container>
      <Panel>
        <Button $active>Run OCL</Button>
        <Button onClick={handleRandomExample}>Load Random Example</Button>
        <Button>Clear Output</Button>
      </Panel>
    </Container>
  )
}

export default memo(Results)

const Panel = styled.div`
  width: 200px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  & > * + * {
    margin-top: 0.5em;
  }
`

const Container = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  border-top: 1px solid #ccc;
  display: flex;
`

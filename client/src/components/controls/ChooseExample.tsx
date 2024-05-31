import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../primitives/Button'
import useNotifications from '../../lib/useNotifications'
import API from '../../lib/api'
import ListItem from './ListItem'
import {getMessage} from '../../lib/strings'

const ChooseExample = () => {
  const [expanded, setExpanded] = useState(false)
  const [examples, setExamples] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotifications()
  const updateExamples = useCallback(async () => {
    try {
      if (loading) return
      setLoading(true)
      const result = await API.fetchExampleList()
      setExamples(result)
    } catch (error) {
      const message = getMessage(error)
      addNotification({
        variant: 'warning',
        title: 'Error updating examples list',
        message
      })
    } finally {
      setLoading(false)
    }
  }, [loading, addNotification])

  const handleClick = useCallback(() => {
    if (!expanded) {
      updateExamples()
    }
    setExpanded(!expanded)
  }, [expanded, updateExamples])

  return (
    <Container>
      <Button onClick={handleClick} $loading={loading}>
        Choose Example
      </Button>
      {expanded && examples.length > 0 && (
        <List>
          {examples.map((example, index) => (
            <ListItem
              key={index}
              example={example}
            />
          ))}
        </List>
      )}
    </Container>
  )
}

export default memo(ChooseExample)


const List = styled.div`
  position: absolute;
  right: calc(-100% - 5px);
  transform: translateY(-50%);
  background-color: white;
  padding: 0.5em;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 0.5em;
  }
`

const Container = styled.div`
  position: relative;
  & > * {
    width: 100%;
  }
`

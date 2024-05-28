import { memo, useCallback } from 'react'
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from '../storage/hooks'
import {shiftNotification} from '../storage/notifications'
import {createPortal} from 'react-dom'

const Notifications = () => {
  const dispatch = useAppDispatch()

  const skipNotification = useCallback(() => {
    dispatch(shiftNotification())
  }, [dispatch])

  const notification = useAppSelector((state) => {
    if (state.notifications.length <= 0) {
      return null
    }
    return state.notifications[0]
  })

  return notification && createPortal((
    <Container>
      <Title>{}</Title>
      {notification.message && (
        <Message>{notification.message}</Message>
      )}
    </Container>
  ), document.body)
}

export default memo(Notifications)

const Message = styled.p`

`

const Title = styled.h2`

`

const Container = styled.div`

`

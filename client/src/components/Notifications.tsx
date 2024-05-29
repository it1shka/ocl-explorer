import { memo, useEffect } from 'react'
import styled, {css, keyframes} from 'styled-components'
import {useAppSelector} from '../storage/hooks'
import {createPortal} from 'react-dom'
import useNotifications from '../lib/useNotifications'
import {Notification} from '../storage/notifications'
import {toTitle} from '../lib/strings'

const NOTIFICATION_TIME = 2500

const getTitle = ({ title, variant }: Notification) => {
  if (title) return title
  if (variant) return toTitle(variant)
  return 'Notification'
}

const Notifications = () => {
  const notification = useAppSelector((state) => {
    if (state.notifications.length <= 0) {
      return null
    }
    return state.notifications[0]
  })

  const { skipNotification } = useNotifications()
  useEffect(() => {
    if (!notification) return
    const timeout = setTimeout(() => {
      skipNotification()
    }, NOTIFICATION_TIME)
    return () => clearTimeout(timeout)
  }, [notification, skipNotification])

  return notification && createPortal((
    <Container $variant={notification.variant}>
      <Title>{getTitle(notification)}</Title>
      {notification.message && (
        <Message>{notification.message}</Message>
      )}
      <Close onClick={skipNotification} />
    </Container>
  ), document.body)
}

export default memo(Notifications)

const Close = styled.button`
  position: absolute;
  top: 5px; right: 5px;
  border: none;
  background: transparent;
  &::after {
    content: '×';
    font-size: 16px;
  }
`

const Message = styled.p`
  margin-top: 0.25em;
`

const Title = styled.h2`
  font-weight: normal;
`

const containerTheme = (variant: Notification['variant']) => {
  switch (variant) {
    case 'success': return css`
      background-color: #81c784;
      border: 1px solid #388e3c;
    `
    case 'warning': return css`
      background-color: #ffb74d;
      border: 1px solid #f57c00;
    `
    case 'error': return css`
      background-color: #e57373;
      border: 1px solid #d32f2f;
    `
    default: return css`
      background-color: #eee;
      border: 1px solid #ccc;
    `
  }
}

const enterAnimation = keyframes`
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`

const Container = styled.div<{
  $variant: Notification['variant']
}>`
  position: fixed;
  z-index: 100;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: min(100vw, 450px);
  padding: 0.5em 0.75em;
  ${({ $variant }) => containerTheme($variant)}
  animation: ${enterAnimation} 0.5s ease-in-out;
`

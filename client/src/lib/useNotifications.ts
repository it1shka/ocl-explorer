import { useCallback } from 'react'
import { useAppDispatch } from '../storage/hooks'
import { Notification, pushNotification, shiftNotification } from '../storage/notifications'

const useNotifications = () => {
  const dispatch = useAppDispatch()

  const addNotification = useCallback((notification: Notification) => {
    dispatch(pushNotification(notification))
  }, [dispatch])

  const skipNotification = useCallback(() => {
    dispatch(shiftNotification())
  }, [dispatch])

  return { addNotification, skipNotification }
}

export default useNotifications

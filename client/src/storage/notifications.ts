import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export type NotificationVariant =
  | 'success'
  | 'message'
  | 'warning'
  | 'error'

export type Notification = Partial<{
  title: string
  message: string
  variant: NotificationVariant
}>

type PushNotificationAction = PayloadAction<Notification>

const notifications = createSlice({
  name: 'notifications',
  initialState: new Array<Notification>,
  reducers: {
    pushNotification: (state, { payload }: PushNotificationAction) => {
      return [...state, payload]
    },
    shiftNotification: ([_, ...tail]) => {
      return tail
    }
  }
})

export default notifications.reducer
export const { 
  pushNotification,
  shiftNotification
} = notifications.actions

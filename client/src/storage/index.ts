import { configureStore } from '@reduxjs/toolkit'
import editorJS from './editorJS'
import editorOCL from './editorOCL'
import global from './global'
import notifications from './notifications'

const store = configureStore({
  reducer: {
    editorJS,
    editorOCL,
    global,
    notifications,
  }
})

export default store
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import editorJS from './editorJS'
import editorOCL from './editorOCL'

const store = configureStore({
  reducer: {
    editorJS,
    editorOCL,
  }
})

export default store
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type JSEditorState = {
  code: string
  language: 'js' | 'ts'
}

const initialState: JSEditorState = {
  code: '// JavaScript or TypeScript code',
  language: 'js'
}

type SetJSCodeAction = PayloadAction<JSEditorState['code']>
type SetLanguageAction = PayloadAction<JSEditorState['language']>

const editorJS = createSlice({
  name: 'editorJS',
  initialState,
  reducers: {
    setJSCode: (state, { payload }: SetJSCodeAction) => {
      state.code = payload
    },
    setLanguage: (state, { payload }: SetLanguageAction) => {
      state.language = payload
    }
  }
})

export default editorJS.reducer
export const { setJSCode, setLanguage } = editorJS.actions


import {PayloadAction, createSlice} from "@reduxjs/toolkit";

type OCLEditorState = {
  code: string
}

const initialState: OCLEditorState = {
  code: '',
}

type SetOCLCodeAction = PayloadAction<OCLEditorState['code']>

const editorOCL = createSlice({
  name: 'editorOCL',
  initialState,
  reducers: {
    setOCLCode: (state, { payload }: SetOCLCodeAction) => {
      state.code = payload
    }
  }
})

export default editorOCL.reducer
export const { setOCLCode } = editorOCL.actions

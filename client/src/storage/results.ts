import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../lib/api'

type VerifyCodeParams = {
  js: string
  ocl: string
}

export const verifyCode = createAsyncThunk (
  'results/verifyCode',
  async ({ js, ocl }: VerifyCodeParams, thunkAPI) => {
    try {
      return await API.verifyOnServer(js, ocl)
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  }
)

type ResultsState = {
  entries: string[]
  loading: boolean
  error: unknown | null
}

const GREETINGS = 'Welcome to OCL explorer!'

const initialState: ResultsState = {
  entries: [GREETINGS],
  loading: false,
  error: null
}

const results = createSlice({
  name: 'results',
  initialState,
  reducers: {
    clearConsole: (state) => {
      state.entries = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(verifyCode.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
    builder.addCase(verifyCode.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(verifyCode.fulfilled, (state, { payload }) => ({
      loading: false,
      error: null,
      entries: [...state.entries, payload ?? '<Empty output>'],
    }))
  }
})

export default results.reducer
export const { clearConsole } = results.actions

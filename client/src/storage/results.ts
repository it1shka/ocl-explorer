import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../lib/api'
import { getMessage } from '../lib/strings'

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
      const message = getMessage(error)
      return thunkAPI.rejectWithValue(message)
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
    builder.addCase(verifyCode.rejected, (state, { payload }) => {
      return ({
        ...state,
        loading: false,
        error: payload,
      })
    })
    builder.addCase(verifyCode.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(verifyCode.fulfilled, (state, { payload }) => ({
      loading: false,
      error: null,
      entries: [...state.entries, payload],
    }))
  }
})

export default results.reducer
export const { clearConsole } = results.actions

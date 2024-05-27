import {createSlice} from '@reduxjs/toolkit'

const FONT_SIZE = Object.freeze({
  MIN: 10,
  DEFAULT: 16,
  MAX: 26,
})

type GlobalState = {
  fontSize: number
  vimEnabled: boolean
}

const initialState: GlobalState = {
  fontSize: FONT_SIZE.DEFAULT,
  vimEnabled: false,
}

const global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    increaseFont: (state) => {
      state.fontSize = Math.min (
        state.fontSize + 1, 
        FONT_SIZE.MAX
      )
    },
    decreaseFont: (state) => {
      state.fontSize = Math.max (
        state.fontSize - 1,
        FONT_SIZE.MIN
      )
    },
    toggleVimMode: (state) => {
      state.vimEnabled = !state.vimEnabled
    }
  }
})

export default global.reducer
export const {
  increaseFont,
  decreaseFont,
  toggleVimMode,
} = global.actions

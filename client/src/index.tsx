import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {createGlobalStyle} from 'styled-components'
import {Provider} from 'react-redux'
import store from './storage'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

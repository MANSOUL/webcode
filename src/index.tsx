import 'babel-polyfill'
import './index.less'
import React from 'react'
import { render } from 'react-dom'
import Layout from './layout'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from './theme'
import themeHorizon from './theme/assets/horizon.json'

import { loadWASM } from 'onigasm'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeHorizon}>
        <Layout />
      </ThemeProvider>
    </Provider>
  )
}

loadWASM('/assets/onigasm.wasm').then(
  async () => {
    render(<App />, document.getElementById('app'))
  },
  error => {
    console.log(error)
  }
)

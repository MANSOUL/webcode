import 'babel-polyfill'
import './index.less'
import React from 'react'
import { render } from 'react-dom'
import Layout from '@src/layout'
import { Provider } from 'react-redux'
import store from '@src/store'
import { ThemeProvider } from '@src/theme'
import themeHorizon from '@src/theme/assets/horizon.json'
import { loadWASM } from 'onigasm'
import * as monaco from 'monaco-editor'
import { grammerAdapter, registerLanguage } from '@src/theme/editor'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={themeHorizon}>
        <Layout />
      </ThemeProvider>
    </Provider>
  )
}

const renderApp = async () => {
  try {
    await loadWASM('/assets/onigasm.wasm')
    await grammerAdapter(monaco)
    render(<App />, document.getElementById('app'))
  } catch (error) {
    console.log(error)
  }
}

renderApp()

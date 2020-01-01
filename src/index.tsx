import 'babel-polyfill'
import './index.less'
import React from 'react'
import { render } from 'react-dom'
import Layout from './layout'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from './theme'
import themeHorizon from './theme/assets/horizon.json'
import themeMaterial from './theme/assets/Material-Theme-Default.json'
import { loadWASM } from 'onigasm'
import * as monaco from 'monaco-editor'
import { grammerAdapter, registerLanguage } from '@src/theme/editor'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeHorizon}>
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

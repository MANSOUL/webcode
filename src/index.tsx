import 'babel-polyfill'
import './index.less'
import React from 'react'
import { render } from 'react-dom'
import Layout from './layout'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

render(<App />, document.getElementById('app'))

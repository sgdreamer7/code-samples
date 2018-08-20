import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './index.less'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'
import ErrorCatch from './components/ErrorCatch'

const store = configureStore()

const Init = () => (
  <Provider store={store}>
    <ErrorCatch>
      <Routes />
    </ErrorCatch>
  </Provider>
)

ReactDOM.render(<Init />, document.getElementById('root'))
registerServiceWorker()

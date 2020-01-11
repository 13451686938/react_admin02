import React from 'react'
import ReactDOM from 'react-dom'
import App from './Router/Router'
import axios from './Utils/axios'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './Store/store'

React.Component.prototype.$axios = axios
ReactDOM.render(
  <Provider store = {store}><App /></Provider>
, document.getElementById('root'));

serviceWorker.unregister()

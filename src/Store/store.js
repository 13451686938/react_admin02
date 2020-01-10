import {createStore,applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import reducers from './reducer'
export default createStore(reducers,applyMiddleware(Thunk))
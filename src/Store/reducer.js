import State from './state'
import * as types from './action-type'
export default (prevState=State,actions) => {
  let newData = JSON.parse(JSON.stringify(prevState))
  let {type,params} = actions
  switch(type){
    case　types.SET_TOKEN_MODAL:
      newData.tokenModal = params
      break;
    default:
      break;
  }
  return newData
}
import State from './state'
import * as types from './action-type'
export default (prevState=State,actions) => {
  let newData = JSON.parse(JSON.stringify(prevState))
  let {type,params} = actions
  switch(type){
    case　types.SET_TOKEN_MODAL:
      newData.tokenModal = params
      break;
    case types.GET_SHOPS_LIST:
      // console.log('GET_SHOPS_LIST', params)
      newData.shopsList = params.foods
      newData.allCount = params.list.allCount
      break;
    case types.SET_BOOL:
      // console.log('SET_BOOL', params)
      newData.bool = params
      break;
    case types.CHANGE_SHOPS_PAGE:
      newData.page = params.page
      newData.pageSize = params.pageSize
      break;
    default:
      break;
  }
  // console.log('newData', newData.bool, newData.shopsList)
  return newData
}
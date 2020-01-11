import * as types from './action-type'
import {getFoods} from '../Api/Shop'
import {getOrderList} from '../Api/order'
export default {
  setTokenModal(params=true){
    return {type:types.SET_TOKEN_MODAL,params}
  },
  getOrder(page,pageSize){
    console.log('ffffff',page,pageSize)
    return (dispatch) => {
      getOrderList(page,pageSize).then((res)=>{
        console.log(res)
        let action = {type:types.GET_ORDER_LIST,params:res}
        dispatch(action)
      })
      .catch((err) => {console.log('err',err)})
    }
  },
  changePage(params){
    let action = {type:types.CHANGE_ORDER_PAGE,params:params}
    return action
  },
  changeOrder(params){
    console.log('111111',params)
    let action = {type:types.CHANGE_ORDER_LIST,params:params}
    return action
  },
  // 异步方法的使用需要dispatch(action)
  GET_SHOPS_LIST  (params){
    return (dispatch) => {
      getFoods(params).then((res)=>{
        let foods = 
        res.list.foods.map((item) => {
          item.foodType = item.foodType.join('/')
          return item
        })
        res.foods = foods
        let action = {type:types.GET_SHOPS_LIST,params:res}
        dispatch(action)
      })
      .catch((err) => {console.log('err',err)})
    }
  },
  SET_BOOL (params) {
    return {type:types.SET_BOOL,params}
  }
}
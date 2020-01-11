import * as types from './action-type'
import {getFoods} from '../Api/Shop'
export default {
  setTokenModal(params=true){
    return {type:types.SET_TOKEN_MODAL,params}
  },
  changeOrderList(params){
    return (dispatch)=>{
      let action={
        type:types.CHANGE_ORDER,
        params:params
      }
      dispatch(action)
    }
  },
  // 异步方法的使用需要dispatch(action)
  GET_SHOPS_LIST  (params){
    return (dispatch) => {
      getFoods(params).then((res)=>{
        
        let foods = 
        res.list.foods.map((item) => {
          // item.foodType = item.foodType.join('/')
          item.foodType = item.foodType.join('')
          return item
        })
        res.foods = foods
        let action = {type:types.GET_SHOPS_LIST,params:res}
        console.log('res', res)
        dispatch(action)
      })
      .catch((err) => {console.log('err',err)})
    }
  },
  CHANGE_SHOPS_PAGE (params) {
    return {type:types.CHANGE_SHOPS_PAGE,params}
  },
  SET_BOOL (params) {
    return {type:types.SET_BOOL,params}
  }
}
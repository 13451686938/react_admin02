import * as types from './action-type'
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
  }
}
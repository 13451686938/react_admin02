import * as types from './action-type'
export default {
  setTokenModal(params=true){
    return {type:types.SET_TOKEN_MODAL,params}
  }
}
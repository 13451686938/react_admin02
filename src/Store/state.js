import {getItem} from '../Utils/webStorage'
export default {
  tokenModal: getItem('token')?false:true
}
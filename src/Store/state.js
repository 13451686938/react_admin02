import {getItem} from '../Utils/webStorage'
export default {
  tokenModal: getItem('token')?false:true,
  page: 1,
  pageSize: 5,
  allCount: 1,
  shopsList: [1,2],
  bool: "false"
}
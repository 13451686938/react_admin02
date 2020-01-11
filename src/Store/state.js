import {getItem} from '../Utils/webStorage'
export default {
  tokenModal: getItem('token')?false:true,
  page: 1,
  pageSize: 10,
  allCount: 1,
  shopsList: [1,2],
  bool: "false",
  orderList:[],
  total:50,
  nowPage:1,
  orderPageSize:3,
}
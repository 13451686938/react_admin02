import rootList from './RootList'
import {getItem} from '../../Utils/webStorage'
// 根据rootId生成对应rootList,用以渲染侧边栏
export const getRootList=()=>{
    let result = []
    let RootIndex=getItem('rootId')||[]
    function hehe(item) {
      if(RootIndex.indexOf(item.id)!==-1){
        result.push(item)
      }else{
        if(item.children){
          let tmp = JSON.parse(JSON.stringify(item))
          tmp.children=[]
          item.children.map((cItem,cIndex) => {
            if(RootIndex.indexOf(cItem.id)!==-1){
              tmp.children.push(cItem)
            }
            return cItem
          })
          if(tmp.children.length>0){
            result.push(tmp)
          }
       }
      }
    }
    rootList.map((item) => {
      hehe(item) 
    })
    return result
  }

import rootList from './RootList'
import {getItem} from '../../Utils/webStorage'
// 根据rootId生成对应rootList,用以渲染侧边栏
export const getRootList = () => {
 let rootId = getItem('rootId')||[]
  let result=[]
  rootList.map((item)=>{
    function getChild () {
      let tem= JSON.parse(JSON.stringify(item))
        tem.children = []
        item.children.map((cItem)=>{
           if(rootId.indexOf(cItem.id)!==-1){
             tem.children.push(cItem)
          }
          return true
        })
        if(tem.children.length>0){
          result.push(tem)
        }
    }
    if(rootId.indexOf(item.id)!==-1){
      result.push(item)
    }else{
      if(item.children){
        getChild()
        item.children.map((cItem)=>{
          if(cItem.children){
            getChild()
          }
          return true
        })
      }
    }
    return true
  })
  return result
}
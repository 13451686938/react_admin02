import React,{Fragment,Component} from 'react'
import Loadable from 'react-loadable'
// 这里是过渡效果组件
export default (loader) => {
  class Loading extends Component() {
    render () {
      return (
        <Fragment>
          <img src='./img/bg1.jpg'></img>
        </Fragment>
      )
    }
  }
  const LoadableComponent = Loadable({
    loader: loader,
    loading: Loading
  })
  return (props) => {
    return (
      <LoadableComponent>
        {props.children}
      </LoadableComponent>
    )
  }
}
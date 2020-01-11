import React,{useState,useEffect} from 'react'
import styles from './Home.module.less'
// useState,useEffect增强函数组件
function Home () {
  const [age,setAge] = useState(16)
  const [money,earnMoney] = useState(1.5)
  useEffect(()=>{
    return () => {
    }
  })
  return(
    <div className={styles.home}>
      <h2>只有</h2>
      <p>高大威猛、英俊潇洒、风流倜傥、玉树临风的帅哥</p>
      <h1>和</h1>
      <p>倾国倾城、沉鱼落雁、冰雪聪明国色天香的美女</p>
      才看得到的首页
    </div>
  )
}
export default Home
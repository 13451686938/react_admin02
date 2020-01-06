import React,{useState,useEffect} from 'react'
// useState,useEffect增强函数组件
function Home () {
  const [age,setAge] = useState(16)
  const [money,earnMoney] = useState(1.5)
  useEffect(()=>{
    return () => {
    }
  })
  return(
    <div>home
      <h2 id='test'>{age}</h2>
      <button onClick = {()=>{
        setAge(age+1)
      }}>setAge</button><br></br>
      {money}
      <button onClick= {()=>{
        earnMoney(money+1)
      }}>work</button>
    </div>
  )
}
export default Home
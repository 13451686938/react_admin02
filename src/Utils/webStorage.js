export const getItem = (key)=>{
  return JSON.parse(localStorage.getItem(key))
}
export const setItem = (key,val)=>{
  return localStorage.setItem(key,JSON.stringify(val))
}
export const clear = () => {
  return localStorage.clear()
}
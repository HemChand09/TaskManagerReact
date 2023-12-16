
const getItem =(key)=>{
    let value = localStorage.getItem(key);
    // if(value !== null) value = JSON.parse(value);
    return value;
}
const setItem =(key,value)=>{
    localStorage.setItem(key, value);
};
export {getItem ,setItem}
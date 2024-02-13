import axios from 'axios'
import React from 'react'

function investList() {
  axios.get('url',investList)
  .then((res)=>{console.log(res.data)})
  .catch((err)=>{err});
  
  return (
    <div>
      
    </div>
  )
}

export default investList

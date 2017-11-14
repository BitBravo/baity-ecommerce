import React from 'react'
import Spinner from './Spinner'

const Loading = (props) => {
  return <div style={{ textAlign: "center",  top: "25%", left: "50%" }} {...props}>
  <h3>Loading...</h3>
  <div style={{display: 'inline-block'}}><Spinner style={{ textAlign: "center"}}/></div>
  
</div>
}

export default Loading;

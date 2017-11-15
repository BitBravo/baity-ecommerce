import React from 'react'
import Spinner from './Spinner'

/*
This component is used as a placeholder while the component
is communicating with the DB (to load its data or do a logout
for example).
While the data is being loaded into the state, we prevent 
the rendering of the original component structure and only 
render this component.
Notice that we use a progress bar when we are waiting for 
a write/update operation.
*/

const Loading = (props) => {
  return <div style={{ textAlign: "center",  top: "25%", left: "50%" }} {...props}>
  <h3>Loading...</h3>
  <div style={{display: 'inline-block'}}><Spinner style={{ textAlign: "center"}}/></div>
  
</div>
}

export default Loading;

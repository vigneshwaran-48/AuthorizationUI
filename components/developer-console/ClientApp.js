import React from 'react'

const ClientApp = (props) => {

  const handleClientAppDelete = () => {
    
  }
  return (
    <div className="client-app y-axis-flex">
      <i onClick={handleClientAppDelete} className="fa fa-solid fa-trash"></i>
      <img src="/client-app.png" alt="client-app" />
      <h2>{ props.name }</h2>
    </div>
  )
}

export default ClientApp;
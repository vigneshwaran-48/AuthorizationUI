import React from 'react'

// Need to send a method from parent to delete and handle the delete in parent comp.
const ClientApp = (props) => {

  const { id, name, deleteApp } = props;

  const handleClientAppDelete = event => {
      event.preventDefault();

      deleteApp(id);
  }

  return (
    <div className="client-app y-axis-flex">
      <i onClick={handleClientAppDelete} className="fa fa-solid fa-trash"></i>
      <img src="/client-app.png" alt="client-app" />
      <h2>{ name }</h2>
    </div>
  )
}

export default ClientApp;
import React, { Suspense } from 'react'
import { ClienAPI } from '../../api/ClientAPI';
import { Await, defer, useLoaderData } from 'react-router';
import Loading from '../../utility/Loading';
import { Common } from '../../utility/Common';
import BackButton from '../../utility/BackButton';
import { Form } from 'react-router-dom';
import ErrorComp from '../../utility/ErrorComp';

export const clientAppSingleViewLoader = ({params}) => {
  const response = ClienAPI.getClient(params.id);
  return defer({client: response});
}
export const clientAppSingleViewAction = async ({params, request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if(formData) {
    const response = await ClienAPI.updateClient(data);
    const respData = await response.json();
    let message = respData.message;
    if(!message) {
      message = respData.error;
    }

    if(response.ok) {
      Common.showSuccessPopup(message, 2);
    }
    else {
      Common.showErrorPopup(message, 2);
    }
  }
  return Common.IGNORE_ACTION;
}


const ClientAppSingleView = () => {

  const clientsLoaderData = useLoaderData();

  const renderClient = response => {
    if(response.status !== 200) {
      let message = response.message;
      Common.showErrorPopup(message != null ? message : response.error, 2);
      return <h1>Try to reload the page.</h1>
    }

    const client = response.client;

    return (
      <>
        <div className="client-app-single-view-image-container x-axis-flex">
          <img src="/client-app.png" alt="client-app"  />
        </div>
        <div className="client-app-single-view-bottom-container">
          <Form 
            className="form y-axis-flex"
            method="put"
          >
            <div className="input-wrapper y-axis-flex">
              <label>Client Name</label>
              <input type="text" name="clientName" defaultValue={client.clientName} />
            </div>
            <div className="input-wrapper y-axis-flex">
              <label>Client Id</label>
              <input type="text" name="clientId" defaultValue={client.clientId} />
            </div>
            <div className="input-wrapper y-axis-flex">
              <label>Redirect Uris</label>
              <input type="text" name="redirectUris" defaultValue={client.redirectUris} />
            </div>
            <div className="input-wrapper y-axis-flex">
              <label>Scopes</label>
              <input type="text" name="scopes" defaultValue={client.scopes} />
            </div>
            <button 
              className="common-button client-app-single-view-button-container-update-button"
            >Update</button>
          </Form>
        </div>
      </>
    )
  }
  return (
    <div className="client-app-single-view y-axis-flex">
      <h1>Overview</h1>
      <BackButton 
        name={<i className="fa fa-solid fa-arrow-left"></i>} 
        isRelativeToPath={true} />
      <Suspense fallback={<Loading />}>
        <Await 
          resolve={clientsLoaderData.client}
          errorElement={<ErrorComp />}
        >
          {renderClient}
        </Await>
      </Suspense>
    </div>
  )
}

export default ClientAppSingleView;

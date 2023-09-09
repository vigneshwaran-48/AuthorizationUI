import React, { Suspense, useEffect, useState } from "react";
import { ClienAPI } from "../../api/ClientAPI";
import { Await, defer, useLoaderData } from "react-router";
import ClientApp from "./ClientApp";
import { Link, useSubmit } from "react-router-dom";
import Loading from "../../utility/Loading";
import { Common } from "../../utility/Common";

export const listAppsLoader = ({ params }) => {
    return defer({clients : ClienAPI.getClientsOfUser()});
}

export const listAppsAction = async ({params, request}) => {

    const formData = await request.formData();
    const mode = formData.get("mode");
    
    if(mode === "delete") {
      const clientId = formData.get("clientId");
      const response = await ClienAPI.deleteClientById(clientId);
      const respData = await response.json();
    
      let message = respData.message;
      if(!message) {
        message = respData.error;
      }
      if(response.ok) {
        Common.showSuccessPopup(message, 2);
        return Common.POST_SUCCESS;
      }
      else {
        Common.showErrorPopup(message, 2);
        return Common.POST_ERROR;
      }
    }
    return Common.IGNORE_ACTION;
  }

const ListApps = () => {

    const clientsLoaderData = useLoaderData();

    const submit = useSubmit();

    const handleClientAppDelete = clientId => {
        const data = {
          mode: "delete",
          clientId
        }
        console.log("Deleting client => " + clientId);
        submit(data, {method: "delete"});
    }

    const renderClients = response => {
        console.log(response);
        if(response.status !== 200) {
            Common.showErrorPopup("Oops! Something went wrong.");
            return <h1>Try to reload the page.</h1>
        }
        const clients = response.data;
        const clientAppElems = clients != null ? 
                                clients.map(clientApp =>{
                                    return (
                                        <Link 
                                            key={clientApp.clientId} 
                                            to={`./${clientApp.clientId}`}>
                                            <ClientApp 
                                                name={clientApp.clientName} 
                                                id={clientApp.clientId}
                                                deleteApp={handleClientAppDelete}
                                            />
                                        </Link>
                                    )
                                })
                                : null;
        return (
            clientAppElems || <h1>You have no client apps</h1>
        )
    }

    

    return (
        <div className="developer-console-child x-axis-flex">
            <div className="developer-console-list-app x-axis-flex">
                <Suspense fallback={<Loading />}>
                    <Await resolve={clientsLoaderData.clients}>
                        {renderClients}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default ListApps;
import React, { Suspense, useEffect, useState } from "react";
import { ClienAPI } from "../../api/ClientAPI";
import { Await, defer, useLoaderData } from "react-router";
import ClientApp from "./ClientApp";
import { Link, useSubmit } from "react-router-dom";
import Loading from "../../utility/Loading";
import { Common } from "../../utility/Common";
import NothingToShow from "../../utility/NothingToShow";
import ErrorComp from "../../utility/ErrorComp";

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
                                            preventScrollReset={true}
                                            to={clientApp.clientId}>
                                            <ClientApp 
                                                name={clientApp.clientName} 
                                                id={clientApp.clientId}
                                                deleteApp={handleClientAppDelete}
                                            />
                                        </Link>
                                    )
                                })
                                : null;

        const isClientsAvailable = clientAppElems?.length;

        return (
            <div 
                className="developer-console-list-app x-axis-flex"
                style={{
                    display: isClientsAvailable ? "grid" : "flex",
                }}
            >
                { isClientsAvailable
                    ? clientAppElems 
                    : <NothingToShow 
                        message="You don't have any client apps yet" 
                        optionalElems={<Link 
                                        to="../create" 
                                        className="common-button create-client-app-button"
                                        >Create an app</Link>}
                      />}
            </div>
        )
    }

    

    return (
        <div className="developer-console-child x-axis-flex">
            <Suspense fallback={<Loading />}>
                <Await 
                    resolve={clientsLoaderData.clients}
                    errorElement={<ErrorComp />}
                >
                    {renderClients}
                </Await>
            </Suspense>
        </div>
    )
}

export default ListApps;
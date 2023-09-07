import React, { Suspense, useEffect, useState } from "react";
import { ClienAPI } from "../../api/ClientAPI";
import { Await, defer, useLoaderData } from "react-router";
import ClientApp from "./ClientApp";
import { Link } from "react-router-dom";
import Loading from "../../utility/Loading";
import { Common } from "../../utility/Common";

export const listAppsLoader = ({ params }) => {
    return defer({clients : ClienAPI.getClientsOfUser()});
}

const ListApps = () => {

    const clientsLoaderData = useLoaderData();

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
                                                    name={clientApp.clientName} />
                                        </Link>
                                    )
                                })
                                : null;
        return (
            clientAppElems || <h1>You have no client apps</h1>
        )
    }

    

    return (
        <div className="developer-console-child developer-console-list-app x-axis-flex">
            <Suspense fallback={<Loading />}>
                <Await resolve={clientsLoaderData.clients}>
                    {renderClients}
                </Await>
            </Suspense>
        </div>
    )
}

export default ListApps;
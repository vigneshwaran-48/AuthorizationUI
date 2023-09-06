import React, { useEffect, useState } from "react";
import { ClienAPI } from "../../api/ClientAPI";
import { useLoaderData } from "react-router";
import ClientApp from "./ClientApp";
import { Link } from "react-router-dom";

export const listAppsLoader = async ({ params }) => {
    return ClienAPI.getClientsOfUser();
}

const ListApps = () => {

    const [clientApps, setClientApps] = useState(null);

    const loaderData = useLoaderData();

    useEffect(() => {
        if(loaderData.data) {
            setClientApps(loaderData.data);
        }
    }, []);

    const clientAppElems = clientApps != null ? 
                            clientApps.map(clientApp =>{
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
        <div className="developer-console-child developer-console-list-app x-axis-flex">
            {
                clientAppElems || <h1>You have no client apps</h1>
            }
        </div>
    )
}

export default ListApps;
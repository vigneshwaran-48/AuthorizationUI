import React, { useState } from "react";
import { Common } from "../../utility/Common";
import { Form, useActionData } from "react-router-dom";
import RequireAuth from "../../utility/RequireAuth";
import { ClienAPI } from "../../api/ClientAPI";

const maxLengthObj = {
    name: 10,
}
const validFieldBorderColor = "rgba(0, 0, 0, 0.2)";

export const createAppLoader = async ({ params }) => {
    await RequireAuth();
}

export const createAppAction = async ({params, request}) => {

    await RequireAuth();
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if(data) {
        console.log('Havind data to submit ...');
        const response = await ClienAPI.createClientApp(data);
        if(response.ok) {
            const data = await response.json();
            return {
                data,
                status: Common.POST_SUCCESS
            }
        }
        else {
            return {
                status: Common.POST_ERROR
            }
        }
    }
    console.log("Not having data to submit ...");
    return {
        status: Common.IGNORE_ACTION
    }
}
const CreateApp = () => {

    const [ formData, setFormData ] = useState({
        clientName: "",
        clientSecret: "",
        scopes: "",
        redirectUris: "",
        path: ""
    });
    
    const [ fieldState, setFieldState ] = useState({
        clientName: true,
        clientSecret: true,
        scopes: true,
        redirectUris: true,
    });

    const actionData = useActionData();

    if(actionData) {
        console.log(actionData);
        if(actionData.status === Common.POST_ERROR) {
            Common.showErrorPopup("Error while creating client", 3);
        }
        else if(actionData.status === Common.POST_SUCCESS) {
            Common.showSuccessPopup("Client created successfully", 3);
        }
        else {
            console.log("Action data ignored ...");
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        let fieldStateValue = true;

        if(maxLengthObj[name] && 
            !Common.checkLength(value, Common.minNameLength, maxLengthObj.name)) {
            fieldStateValue= false;
        }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: value
            }
        });
        setFieldState(prevState => {
            return {
                ...prevState,
                [ name ]: fieldStateValue
            }
        });
    }

    return (
        <div 
            className="developer-console-child developer-console-create-app y-axis-flex">
            <h3>Create your App</h3>
        
            <Form 
                className="client-app-create-form y-axis-flex"
                method="post"
            >
                <div className="client-app-input-wrapper">
                    <label>App Name</label>
                    <input 
                        name="clientName"
                        value={formData.clientName}
                        placeholder="App name"
                        onChange={ handleChange }
                        style={{
                            borderColor: fieldState.clientName ? validFieldBorderColor: "red"
                        }}
                    />
                </div>
                <div className="client-app-input-wrapper">
                    <label>Secret</label>
                    <input 
                        name="clientSecret"
                        type="password"
                        value={formData.clientSecret}
                        placeholder="Secret"
                        onChange={ handleChange }
                        style={{
                            borderColor: fieldState.clientSecret ? validFieldBorderColor: "red"
                        }}
                    />
                </div>
                <div className="client-app-input-wrapper">
                    <label>Scopes</label>
                    <input 
                        name="scopes"
                        value={formData.scopes}
                        placeholder="openid,Todo.read,..."
                        onChange={ handleChange }
                        style={{
                            borderColor: fieldState.scopes ? validFieldBorderColor: "red"
                        }}
                    />
                </div>
                <div className="client-app-input-wrapper">
                    <label>Redirect URIs</label>
                    <input 
                        name="redirectUris"
                        value={ formData.redirectUris }
                        placeholder="https://proapp-client.com/home"
                        onChange={ handleChange }
                        style={{
                            borderColor: fieldState.redirectUris ? 
                                         validFieldBorderColor: "red"
                        }}
                    />
                </div>
                <input hidden name="path" value={formData.path} />
                <button 
                    className="common-button client-app-create-button"
                >Create</button>
            </Form>
        </div>
    )
}

export default CreateApp;
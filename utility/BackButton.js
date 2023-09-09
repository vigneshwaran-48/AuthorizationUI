import React from 'react'
import { Link } from 'react-router-dom';

const BackButton = props => {

    const { name, isRelativeToPath } = props;

    return (
        <Link 
            to=".." 
            relative={isRelativeToPath ? "path" : "route"}
            className="back-button-comp common-button"
        >{ name }</Link>
    )
}

export default BackButton;
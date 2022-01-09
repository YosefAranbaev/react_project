import React, { useState, useEffect } from "react";
const FormField = (props) => {
    const nameField = {
        width: '538px',
        height: '35px',
        marginLeft:'40px',
        backgroundColor:'#F6F7FB',
        borderStyle: 'none',
        marginTop:'4px',
        paddingLeft:'10px'
        // zIndex:'2',
        // objectFit: 'cover',
    }
    const fieldTitle = {
        marginTop:'25px',
        marginLeft: '40px',
        color: '#77787B',
        fontWeight: 'bold',
        // zIndex:'2',
        // objectFit: 'cover',
    }
    return (<div>
            <div style={fieldTitle}>{props.value}</div>
            <input style={nameField} placeholder={props.value} type="text" tabindex="1" name="Location" className="forminput" autocomplete="off" />
    </div> );
};

export default FormField;
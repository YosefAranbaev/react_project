import React, { useState, useEffect } from "react";
const FormField = (props) => {
    const [title, setTitle] = useState('');
    useEffect(() => { setTitle(props.value) }, [props.value])
    const nameField = {
        width: '538px',
        height: '35px',
        marginLeft: '40px',
        backgroundColor: '#F6F7FB',
        borderStyle: 'none',
        marginTop: '4px',
        paddingLeft: '10px'
    }
    const fieldTitle = {
        marginTop: '25px',
        marginLeft: '40px',
        color: '#77787B',
        fontWeight: 'bold',
    }
    return (<div>
        <div style={fieldTitle}>{props.type}</div>
        <input style={nameField} onChange={props.onChange} placeholder={props.type} value={props.value} 
        type="text" name={props.name} className="forminput" autoComplete="off" />
    </div>);
};

export default FormField;
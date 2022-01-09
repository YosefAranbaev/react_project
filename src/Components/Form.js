import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Card, CardContent } from '@mui/material';
import FormField from "./FormField";
import FormButton from "./FormButton";
const Form = (props) => {
    const header = {
        marginLeft: '199px',
        fontSize: '25px',
        fontWeight: 'normal',
        lineHeight: '34px',
        color: '#000001',
        textShadow: '0px 2px 80px #FFFFFF',
        marginTop:'13px'
        // fontFamily: 'Alef'
    }
    const fields = {
       position:'absolute',
       marginTop:'-29px'
    }
   
    return (
        <Card sx={{
            width: '618px', height: '552px', backgroundColor: 'white', borderRadius: '25px', position: 'absolute',
            position: 'absolute', marginLeft: '772px', marginTop: '114px', backgroundImage: "url('images/formpic.png')",
            backgroundRepeat: 'no-repeat', backgroundPosition: '50% 100%',
            // backgroundPosition: 'center',
        }}>
            {/* <div style={formpic}></div> */}
            {/* <img style={formpic} src={'images/formpic.png'} alt="Italian Trulli"/> */}
            <div style={header} >Add new vacation</div>
            <div style={fields}>
            <FormField value="Name"></FormField>
            <FormField value="Location"></FormField>
            <FormField value="Price"></FormField>
            <FormField value="Image url"></FormField>
            </div>
            {/* <FormInput type="name"></FormInput> */}
            
            
            
        </Card>
    );
};

export default Form;

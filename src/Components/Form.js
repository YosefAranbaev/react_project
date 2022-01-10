import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Card, CardContent } from '@mui/material';
import FormField from "./FormField";
import FormButton from "./FormButton";
import EventEmitter from "../EventEmitter";
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

const Form = (props) => {
    const [newVacation, setNewVacation] = useState({
        'name': null,
        'location': null,
        'price': null,
        'imageUrl': null
    });
    const header = {
        marginLeft: '199px',
        fontSize: '25px',
        fontWeight: 'normal',
        lineHeight: '34px',
        color: '#000001',
        textShadow: '0px 2px 80px #FFFFFF',
        marginTop: '13px'
        // fontFamily: 'Alef'
    }
    const fields = {
        position: 'absolute',
        marginTop: '-29px'
    }
    // 
    EventEmitter.addListener('edit', vacation => {
        const vacationToEdit = {
            'id': vacation.id,
            'name': vacation.name,
            'location': vacation.location,
            'price': vacation.price,
            'imageUrl': vacation.imageUrl
        };
        console.log(vacation);
        // newVacation.name="hello";
        setNewVacation(vacationToEdit);
    });
    const handleInput = (event) => {
        setNewVacation(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }
    // const onSubmit = ()=>{
    //     props.onSubmit(newVacation);
    //     // console.log(newVacation);
    // }
    const addVac = ()=>{
        // console.log(newVacation);
        EventEmitter.emit('add',newVacation);
    }
    return (
        <React.Fragment>
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
                    <FormField onChange={handleInput} type="Name" name="name" value={newVacation.name}></FormField>
                    <FormField onChange={handleInput} type="Location" name="location" value={newVacation.location}></FormField>
                    <FormField onChange={handleInput} type="Price" name="price" value={newVacation.price}></FormField>
                    <FormField onChange={handleInput} type="Image url" name="imageUrl" value={newVacation.imageUrl}></FormField>
                </div>
                {/* <FormInput type="name"></FormInput> */}

            </Card>
            <FormButton onClick={addVac}/>
        </React.Fragment>
    );
};

export default Form;

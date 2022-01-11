import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Card, CardContent } from '@mui/material';
import FormField from "./FormField";
import FormButton from "./FormButton";
import EventEmitter from "../EventEmitter";
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const Form = (props) => {
    const buttonV={
        position: 'absolute',
        width: '52px',
        height: '52px',
        backgroundColor: '#F86549',
        borderRadius: '26px',
        borderStyle: 'none',
        marginLeft: '1070px',
        marginTop: '640px',
        fontSize: '25px',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
    const buttonX = {
        position: 'absolute',
        width: '52px',
        height: '52px',
        backgroundColor: '#F86549',
        borderRadius: '26px',
        borderStyle: 'none',
        marginLeft: '1000px',
        marginTop: '640px',
        fontSize: '25px',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
    const [newVacation, setNewVacation] = useState({
        'formPic': "url('images/formpic.png')",
        'mode': 0,
        'name': null,
        'location': null,
        'price': null,
        'imageUrl': null
    });
    const removePic = {
        backgroundColor: 'red'
    }
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
        newVacation.mode = 1;
        newVacation.formPic = 'none';
        console.log(newVacation.mode);
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
    const vbutton =()=>{
        // newVacation.mode = 0;
        // newVacation.formPic = "url('images/formpic.png')";
        // newVacation.id=null;
        // newVacation.name = "";
        // newVacation.location="";
        // newVacation.price="";
        // newVacation.imageUrl="";
        // console.log(newVacation);
        // setNewVacation(prevState => {
        //     return {
        //         ...prevState,
        //         newVacation
        //     }
        // });
        const obj = {
            'id':newVacation.id,
            'idea':newVacation.name,
            'group': newVacation.location,
            'cost': newVacation.price,
            'img': newVacation.imageUrl
        }
        EventEmitter.emit('update',obj);
    }
    const addVac = () => {
        // console.log(newVacation);
        EventEmitter.emit('add', newVacation);
    }
    const xbutton = () => {
        // alert("hello");
        newVacation.mode = 0;
        newVacation.formPic = "url('images/formpic.png')";
        newVacation.id=null;
        newVacation.name = "";
        newVacation.location="";
        newVacation.price="";
        newVacation.imageUrl="";
        console.log(newVacation);
        setNewVacation(prevState => {
            return {
                ...prevState,
                newVacation
            }
        });
    }
    return (
        <React.Fragment>
            <Card sx={{
                width: '618px', height: '552px', backgroundColor: 'white', borderRadius: '25px', position: 'absolute',
                position: 'absolute', marginLeft: '772px', marginTop: '114px', backgroundImage: newVacation.formPic,
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
            {newVacation.mode === 0 ? <FormButton mode={newVacation.mode} onClick={addVac} /> :
                <><button onClick={xbutton} style={buttonX}>X</button><button onClick={vbutton} style={buttonV}>V</button></>}
            {/* <FormButton mode={newVacation.mode} onClick={addVac}/> */}
        </React.Fragment>

    );
};

export default Form;

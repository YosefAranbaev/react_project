import React, { useState } from "react";
import { Card } from '@mui/material';
import FormField from "./FormField";
import FormButton from "./FormButton";
import EventEmitter from "../EventEmitter";
import DoneIcon from '@mui/icons-material/Done';
const Form = (props) => {
    const [newVacation, setNewVacation] = useState({
        'name': null,
        'location': null,
        'price': null,
        'imageUrl': null
    });
    const [newVacationClick, setNewVacationClick] = useState({
        'formPic': "url('images/formpic.png')",
        'mode': 0,
        'header':'Add new vacation'
    });
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
    const header = {
        marginLeft: '199px',
        fontSize: '25px',
        fontWeight: 'normal',
        lineHeight: '34px',
        color: '#000001',
        textShadow: '0px 2px 80px #FFFFFF',
        marginTop: '13px'
    }
    const fields = {
        position: 'absolute',
        marginTop: '-29px'
    }
    EventEmitter.addListener('edit', vacation => {
        const vacationToEdit = {
            'id': vacation.id,
            'name': vacation.name,
            'location': vacation.location,
            'price': vacation.price,
            'imageUrl': vacation.imageUrl
        };  
        setNewVacationClick(prevState=>({...prevState,header:'Edit a vacation'}))
        setNewVacationClick(prevState=>({...prevState,mode:1}))
        setNewVacationClick(prevState=>({...prevState,formPic:'none'}))
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
    const vbutton =()=>{
        const obj = {
            'id':newVacation.id,
            'idea':newVacation.name,
            'group': newVacation.location,
            'cost': newVacation.price,
            'img': newVacation.imageUrl
        }
        EventEmitter.emit('update',obj);
        setNewVacationClick(prevState=>({...prevState,mode:0}));
        setNewVacationClick(prevState=>({...prevState,header:'Add new vacation'}))
        setNewVacationClick(prevState=>({...prevState,formPic: "url('images/formpic.png')"}));
        newVacation.id=null;
        newVacation.name = "";
        newVacation.location="";
        newVacation.price="";
        newVacation.imageUrl="";
        setNewVacation(prevState => {
            return {
                ...prevState,
                newVacation
            }
        });
    }
    const addVac = () => {
        EventEmitter.emit('add', newVacation);
    }
    const xbutton = () => {
        // alert("hello");
        setNewVacationClick(prevState=>({...prevState,mode:0}))
        setNewVacationClick(prevState=>({...prevState,header:'Add new vacation'}))
        setNewVacationClick(prevState=>({...prevState,formPic: "url('images/formpic.png')"}));
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
    //Edit a vacation  
    return (
        <React.Fragment>
            <Card sx={{
                width: '618px', height: '552px', backgroundColor: 'white', borderRadius: '25px', position: 'absolute',
                position: 'absolute', marginLeft: '772px', marginTop: '114px', backgroundImage: newVacationClick.formPic,
                backgroundRepeat: 'no-repeat', backgroundPosition: '50% 100%', boxShadow:'none',
            }}>
                <div style={header} >{newVacationClick.header}</div>
                <div style={fields}>
                    <FormField onChange={handleInput} type="Name" name="name" value={newVacation.name}></FormField>
                    <FormField onChange={handleInput} type="Location" name="location" value={newVacation.location}></FormField>
                    <FormField onChange={handleInput} type="Price" name="price" value={newVacation.price}></FormField>
                    <FormField onChange={handleInput} type="Image url" name="imageUrl" value={newVacation.imageUrl}></FormField>
                </div>

            </Card>
            {newVacationClick.mode === 0 ? <FormButton mode={newVacationClick.mode} onClick={addVac} /> :
                <><button onClick={xbutton} style={buttonX}>X</button><button onClick={vbutton} style={buttonV}><DoneIcon sx={{color:'white',width:'74px',height:'32px',marginLeft:'-16px',marginTop:'4px',fontWeight: 'bold'}}/></button></>}
        </React.Fragment>

    );
};

export default Form;

import { Tooltip, TextField } from '@mui/material';
import React, { useState, Component } from 'react';
import Idea from './Idea';
import { MdAdd } from 'react-icons/md';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import Form from './Form';
// import {ModeEditIcon} from '@mui/icons-material/ModeEdit';
// import {Tooltip } from '@mui/material';
// import ideasData from './../data/ideas.json'
import FormButton from "./FormButton";
import EventEmitter from "../EventEmitter";
const IdeasList = (props) => {
    const [vacations, setVacations] = useState(
        [
            { id: 0, idea: "Phi Phi Islands", group: "Thiland", img: "images/image.png", cost: "$1044" },
            { id: 1, idea: "Cyber Crawler", group: "Thiland", img: "images/image-2.png", cost: "$1044" },
            { id: 2, idea: "Intellimap", group: "Maldives", img: "images/image-3.png", cost: "$1044" },
        ])
    const add = ({ id = null, txt = 'default title', grp = 'defaule group' }) => {
        setVacations(prevState => (
            [
                ...prevState, {
                    id: id !== null ? id : nextId(prevState),
                    idea: txt,
                    group: grp
                }]
        ))
    }
    const nextId = (ideas = []) => {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }
    const update = (newVac) => {
        newVac.preventDefault();
        // props.onChange(newVac, props);
        setVacations(prevState => (
            prevState.map(
                idea => idea.id !== newVac.id ? idea : { ...idea, ...newVac }
            )
        ));
    }
    const deleteVacation = (id) => {
        setVacations(prevState => (
            prevState.filter(idea => idea.id !== id)
        ))
    }
    const eachIdea = (item, i) => {
        return <Idea key={i} img={item.img
        } cost={item.cost} idea={item.idea} group={item.group} index={item.id} onChange={update} onDelete={deleteVacation} >
            <h4>{item.idea}</h4><LocationOnIcon id="loc" sx={{ color: '#FF6647', fontSize: 17, marginTop: '-13px' }} /><h5>{item.group}
                <span>{item.cost}</span></h5></Idea >
    }
    // getFormValues()
    const onSave = (values) => {
        update(values);
        console.log(values);
    }
    EventEmitter.addListener('add', vacation => {
        console.log(vacation);
        console.log(vacations.length+1);
        const vacationToEdit = {
            'id': vacations.length+1,
            'idea': vacation.name,
            'group': vacation.location,
            'cost': vacation.price,
            'img': vacation.imageUrl
        };
       setVacations(prevState=>[...prevState,vacationToEdit])
       console.log(vacations);
    });
    return (
        <div>
            <Form onSubmit={onSave}/>
            {/* <FormButton ></FormButton> */}
            <SearchIcon className='searchicon-1' sx={{ width: '18.75px', height: '18.75px' }} />
            <input placeholder="Search by name or location" className="search" type="text" tabIndex="1" name="name" autoComplete="off" />
            <button className='searchbutton'><SearchIcon sx={{ width: '28px', height: '28px', color: 'white' }} /></button>
            {/* <TextField id="outlined-basic" label="Search by name or location" variant="outlined" /> */}
            <div className="ideas-list">
                {/* <img src="../images/image-1.png" alt="Italian Trulli"/> */}
                {vacations.map(eachIdea)}
                {/* <Tooltip title="Add new Idea"> */}
                {/* <button onClick={this.add}> */}
                {/* <MdAdd /><ModeEditIcon /> */}
                {/* </button> */}
                {/* </Tooltip> */}
            </div>
        </div>
    )
}



export default IdeasList;

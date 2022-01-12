import { Tooltip, TextField } from '@mui/material';
import React, { useState, Component } from 'react';
import Vacation from './Vacation';
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
const VacationList = (props) => {
    const [vacations, setVacations] = useState(
        [
            { id: 0, idea: "Phi Phi Islands", group: "Thiland", img: "images/image.png", cost: "$1044", display: "block" },
            { id: 1, idea: "Cyber Crawler", group: "Thiland", img: "images/image-2.png", cost: "$1044", display: "block" },
            { id: 2, idea: "Intellimap", group: "Maldives", img: "images/image-3.png", cost: "$1044", display: "block" },
        ])
    const [search, setSearch] = useState("");
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
        setVacations(prevState => (
            prevState.map(
                idea => idea.id !== newVac.id ? idea : { ...idea, ...newVac }
            )
        ));
    }
    EventEmitter.addListener('update', vacation => {
        // props.onChange(newVac, props);
        update(vacation);
        // console.log(vacation);
        // console.log(vacations);
        // // vacation.preventDefault();
        // setVacations(prevState => (
        //     prevState.map(
        //         idea => idea.id !== vacation.id ? idea : { ...idea, vacation }
        //     )
        // ));
    });
    const deleteVacation = (id) => {
        setVacations(prevState => (
            prevState.filter(idea => idea.id !== id)
        ))
    }
    const eachIdea = (item, i) => {
        return <Vacation key={i} img={item.img
        } cost={item.cost} display={item.display} idea={item.idea} group={item.group} index={item.id} onChange={update} onDelete={deleteVacation} >
            <h4>{item.idea}</h4><LocationOnIcon id="loc" sx={{ color: '#FF6647', fontSize: 17, marginTop: '-13px' }} /><h5>{item.group}
                <span>{item.cost}</span></h5></Vacation>
    }
    // getFormValues()
    const onSave = (values) => {
        update(values);
        console.log(values);
    }
    const findVacations = () => {
        console.log(search);
        console.log(vacations);
        if(search === "")
        {
            setVacations(prevState => (
                prevState.map(
                    vac => vac.idea.includes(search) === false ? vac : { ...vac, display: 'display' }
                )
            ));
        }
        if (search !== "") {
            setVacations(prevState => (
                prevState.map(
                    vac => vac.idea.includes(search) === true ? vac : { ...vac, display: 'none' }
                )
            ));
        }
    }
    EventEmitter.addListener('add', vacation => {
        // console.log(vacation);
        // console.log(vacations.length+1);
        const vacationToEdit = {
            'id': vacations.length + 1,
            'idea': vacation.name,
            'group': vacation.location,
            'cost': vacation.price,
            'img': vacation.imageUrl
        };
        setVacations(prevState => [...prevState, vacationToEdit])
        console.log(vacations);
        //    console.log(vacations);
    });
    return (
        <div>
            <Form onSubmit={onSave} />
            {/* <FormButton ></FormButton> */}
            <SearchIcon className='searchicon-1' sx={{ width: '18.75px', height: '18.75px' }} />
            <input onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or location" className="search" type="text" tabIndex="1" name="name" autoComplete="off" />
            <button onClick={findVacations} className='searchbutton'><SearchIcon sx={{ width: '28px', height: '28px', color: 'white' }} /></button>
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



export default VacationList;

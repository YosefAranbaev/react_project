import React, { useState } from 'react';
import Vacation from './Vacation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Form from './Form';
import EventEmitter from "../EventEmitter";
const VacationList = (props) => {
    const [vacations, setVacations] = useState(
        [
            { id: 0, idea: "Phi Phi Islands", group: "Thiland", img: "images/image.png", cost: "$1044", display: "block" },
            { id: 1, idea: "Cyber Crawler", group: "Thiland", img: "images/image-2.png", cost: "$1044", display: "block" },
            { id: 2, idea: "Intellimap", group: "Maldives", img: "images/image-3.png", cost: "$1044", display: "block" },
        ])
    const [search, setSearch] = useState("");

    const costColor = {
        color: '#34A59F',
    }

    const update = (newVac) => {
        setVacations(prevState => (
            prevState.map(
                idea => idea.id !== newVac.id ? idea : { ...idea, ...newVac }
            )
        ));
    }
    EventEmitter.addListener('update', vacation => {
        update(vacation);
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
                <span style={costColor}>{item.cost}</span></h5></Vacation>
    }
    const onSave = (values) => {
        update(values);
        console.log(values);
    }
    const findVacations = () => {
        console.log(search);
        console.log(vacations);

        setVacations(prevState => (
            prevState.map(
                vac => vac.idea.includes(search) === false ? vac : { ...vac, display: 'display' }
            )
        ));

        if (search !== "") {
            setVacations(prevState => (
                prevState.map(
                    vac => vac.idea.includes(search) === true ? vac : { ...vac, display: 'none' }
                )
            ));
        }
    }
    EventEmitter.addListener('add', vacation => {
        const vacationToEdit = {
            'id': vacations.length + 1,
            'idea': vacation.name,
            'group': vacation.location,
            'cost': vacation.price,
            'img': vacation.imageUrl
        };
        if (vacationToEdit.idea == null)
            vacationToEdit.idea = "none";
        if (vacationToEdit.group == null)
            vacationToEdit.group = 'none';
        if (vacationToEdit.cost == null)
            vacationToEdit.cost = '$0';
        if (vacationToEdit.img !== "images/image.png" || vacationToEdit.img !== "images/image-1.png"
            || vacationToEdit.img !== "images/image-2.png" || vacationToEdit.img !== "images/image-3.png"
            || vacationToEdit.img !== "images/image-4.png" || vacationToEdit.img !== "images/image-5.png")
            vacationToEdit.img = 'images/image.png';
        setVacations(prevState => [...prevState, vacationToEdit])
        console.log(vacations);
    });
    return (
        <div>
            <Form onSubmit={onSave} />
            <SearchIcon className='searchicon-1' sx={{ width: '18.75px', height: '18.75px' }} />
            <input onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or location" className="search" type="text" name="name" autoComplete="off" />
            <button onClick={findVacations} className='searchbutton'><SearchIcon sx={{ width: '28px', height: '28px', color: 'white' }} /></button>
            <div className="ideas-list">
                {vacations.map(eachIdea)}
            </div>
        </div>
    )
}



export default VacationList;

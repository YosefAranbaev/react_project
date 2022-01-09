import { Tooltip, TextField } from '@mui/material';
import React, { Component } from 'react';
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
class IdeasList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ideas: [
                { id: 3, idea: "Phi Phi Islands", group: "Thiland", img: "images/image.png", cost: "$1044" },
                { id: 7, idea: "Cyber Crawler", group: "Thiland", img: "images/image-2.png", cost: "$1044" },
                { id: 8, idea: "Intellimap", group: "Maldives", img: "images/image-3.png", cost: "$1044" },
            ]
        }

        this.eachIdea = this.eachIdea.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    }
    add({ id = null, txt = 'default title', grp = 'defaule group' }) {
        this.setState(prevState => ({
            ideas: [
                ...prevState.ideas, {
                    id: id !== null ? id : this.nextId(prevState.ideas),
                    idea: txt,
                    group: grp
                }]
        }))
    }
    nextId(ideas = []) {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }
    update(newIdea, i) {
        console.log(`Update ${i}: newIdea: ${newIdea}`);

        this.setState(prevState => ({
            ideas: prevState.ideas.map(
                idea => idea.id !== i ? idea : { ...idea, idea: newIdea }
            )
        }));
    }
    delete(id) {
        this.setState(prevState => ({
            ideas: prevState.ideas.filter(idea => idea.id !== id)
        }))
    }
    eachIdea(item, i) {
        return <Idea key={i} img={item.img} index={item.id} onChange={this.update} onDelete={this.delete}>
            <h4>{item.idea}</h4><LocationOnIcon id="loc" sx={{ color: '#FF6647', fontSize: 17, marginTop: '-13px' }} /><h5>{item.group}
                <span>{item.cost}</span></h5></Idea>
    }
    render() {
        return (
            <div>
                <Form></Form>
                <FormButton></FormButton>
                <SearchIcon className='searchicon-1' sx={{ width: '18.75px', height: '18.75px' }} />    
                <input placeholder="Search by name or location" className="search" type="text" tabindex="1" name="name" autocomplete="off" />
                <button className='searchbutton'><SearchIcon sx={{ width: '28px', height: '28px',color:'white' }} /></button>                    
                {/* <TextField id="outlined-basic" label="Search by name or location" variant="outlined" /> */}
                <div className="ideas-list">
                    {/* <img src="../images/image-1.png" alt="Italian Trulli"/> */}
                    {this.state.ideas.map(this.eachIdea)}
                    {/* <Tooltip title="Add new Idea"> */}
                    {/* <button onClick={this.add}> */}
                    {/* <MdAdd /><ModeEditIcon /> */}
                    {/* </button> */}
                    {/* </Tooltip> */}
                </div>
            </div>
        )
    }
}



export default IdeasList;

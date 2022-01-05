import { Tooltip } from '@mui/material';
import React, { Component } from 'react';
import Idea from './Idea';
import { MdAdd } from 'react-icons/md';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import {ModeEditIcon} from '@mui/icons-material/ModeEdit';
// import {Tooltip } from '@mui/material';
// import ideasData from './../data/ideas.json'
class IdeasList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ideas: [
                { id: 3, idea: "Tripper", group: "Tamar, Haim",img:"../images/image-1.png" },
                { id: 7, idea: "Cyber Crawler", group: "Dan, Eden",img:"../images/image-2.png" },
                { id: 8, idea: "Intellimap", group: "Dima, Or, Daria", img:"../images/image-3.png"},
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
        return <Idea key={i} index={item.id} onChange={this.update} onDelete={this.delete}>
            <h4>{item.idea}</h4><h5>By: {item.group}</h5>
        </Idea>
    }

    render() {
        return (
            <div className="ideas-list">
                {/* <img src="../images/image-1.png" alt="Italian Trulli"/> */}
                {this.state.ideas.map(this.eachIdea)}
                <Tooltip title="Add new Idea">
                    <button onClick={this.add}><MdAdd /><ModeEditIcon /></button>
                </Tooltip>
            </div>
        )
    }
}



export default IdeasList;

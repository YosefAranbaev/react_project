import React, { Component } from 'react'; 
import { Card, CardContent } from '@mui/material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
class Idea extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.add = this.add.bind(this);
    }

    edit() {
        this.setState({
            editing: true
        })
    }

    delete() {
        this.props.onDelete(this.props.index)
    }

    save(e) {
        e.preventDefault();

        this.props.onChange(this.newIdea.value, this.props.index);

        this.setState({
            editing: false
        })
    }

    add() {
        this.props.onAdd();
    }

    renderForm() {
        return (
            <div className="idea">                
                <div>{this.props.children}</div>                
                <form>
                    <textarea ref={input => {this.newIdea = input}} />
                    <button onClick = { this.save }>Save</button>
                </form>           
            </div>
        )
    }

    renderUI() { 
        return (
            <Card class="card" >
            {/* <div className="idea">                 */}
            {/* <CardContent> */}
                <img src={this.props.img} alt="Italian Trulli"/>
                <div>{this.props.children}</div>                
                <span className='buttons'>                    
                    <button onClick = { this.edit }><CreateRoundedIcon sx={{ color: 'white',marginLeft:'-2px'}}/></button>                    
                    <button onClick = { this.delete }><DeleteRoundedIcon sx={{ color: 'white',marginLeft:'-2px'}}/></button>    
                    {/* <button onClick = { this.add }>Add</button>               */}
                </span>            
            {/* </div> */}
            {/* </CardContent> */}
            </Card>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderUI();
    }
}

export default  Idea;
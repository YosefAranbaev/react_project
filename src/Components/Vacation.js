import React, { Component } from 'react'; 
import { Card, CardContent } from '@mui/material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Form from './Form';
import EventEmitter from "../EventEmitter";
 const Vacation =(props)=> { 

    const edit = ()=> {
        console.log(props);
        const obj = {
            'id':props.index,
            'name':props.idea,
            'location': props.group,
            'price': props.cost,
            'imageUrl':props.img
        }
        console.log(props.children);   
        EventEmitter.emit('edit',obj);
    }

   const deleteVacation = () => {
       props.onDelete(props.index)
    }
        return (
            <Card className="card" sx={{boxShadow:'none',display:props.display}} >
                <img src={props.img} alt="Italian Trulli"/>
                <div>{props.children}</div>  
                <span className='buttons'>                    
                    <button onClick = { edit }><CreateRoundedIcon sx={{ color: 'white',marginLeft:'-2px'}}/></button>                    
                    <button onClick = { deleteVacation }><DeleteRoundedIcon sx={{ color: 'white',marginLeft:'-2px'}}/></button>    
                </span>            
            </Card>
        )

}

export default  Vacation;
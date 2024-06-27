import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleName =(event)=>{
        setName(event.target.value)
    };
    const handleRoom =(event)=>{
        setRoom(event.target.value);
    };
    const handleButton = (event) => {
        if (!name || !room) {
            event.preventDefault();
            alert('Fill all the details!');
        }
    };
    

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" 
                            type="text"    
                            className="joinInput" 
                            onChange={handleName}/>
                </div>
                <div><input placeholder="Room" 
                            type="text" 
                            className="joinInput mt-20"  
                            onChange={handleRoom}/>
                </div>
                <Link onClick={handleButton} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
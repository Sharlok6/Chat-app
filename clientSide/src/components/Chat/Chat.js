import React from "react";
import { useState,useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from "react-router";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import './Chat.css';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = 'http://localhost:5000';


    const location = useLocation();
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        //this is used to pass on data and any events from client side to server side
        socket.emit('join', {name , room},({error})=>{
            if(error)
                alert(error);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages((messages) => [ ...messages , message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.off('message');
            socket.off('roomData');
        };
    },[messages]);

    const sendMessage = (event)=>{
        event.preventDefault();
        if (message.trim()) {
            // Emit the message to the server
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    //console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users} />
        </div>
    )
};

export default Chat;
import React from "react";
import './Messages.css';
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({messages, name}) =>{
    console.log("Messages component received messages:", messages);
    console.log("Messages component received name:", name);

    return(
        <ScrollToBottom className="messages">
            {messages.map((message,i)=>
            <div key={i} >
                <Message message={message} name={name}/>
            </div>)}
        </ScrollToBottom>   
)}
export default Messages;
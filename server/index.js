const express = require('express');
const socket_io = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUserInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);

//This cors is added for safely accessing data from one port to another
const io = socket_io(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST']
    }
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));

io.on("connection",(socket)=>{
    console.log('We have a new connection!');

    //here we are receiving the data and other objects from client side
    socket.on('join',({name,room},callback)=>{
        const { error , user } = addUser({id: socket.id, name,room});

        if(error) 
            return callback({error});

        socket.join(user.room);
        
        //We are emitting events from backend to front end
        socket.emit('message', {
            user: 'admin', text:`Hello ${user.name}, Welcome to the room ${user.room}!`
        });
        socket.broadcast.to(user.room).emit('message',{
            user: 'admin', text: `${user.name} has joined`
        });
        
        io.to(user.room).emit('roomData',{
            room: user.room, users: getUserInRoom(user.room)
        });
        callback({});
    });
    
    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id);

        if(user){
            io.to(user.room).emit('message',{
                user: user.name, text: message
            });
            // io.to(user.room).emit('roomData',{
            //     room: user.room, users: getUserInRoom(user.room)
            // });
        }
        callback();
    });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{
                user:'admin', text: `${user.name} has left.`
            })
            io.to(user.room).emit('roomData',{
                room: user.room, users: getUserInRoom(user.room)
            });
        }
    })
});

app.use(router);

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
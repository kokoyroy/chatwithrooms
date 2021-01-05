const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')
const formatMessage = require('./utils/messages');
const io = require('socket.io')(server);
const { userjoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users');
// const socket = require('socket.io');
// const io = socketio(server);
const botName = 'chatBot'

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')))




//run when a client connects
io.on('connection', (socket) => {





    //broadcasts when a client disconnects
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        // console.log(user[0].username);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, user.username + ' has left the chat'))
            io.to(user.room).emit('room', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })



    //Listen for a chatMessage
    socket.on('chatMessage', (msg) => {
        //identifies the name of the user based on his id
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })


    //room join
    socket.on('joinChatroom', ({ username, room }) => {
        //users becomes an object with username,room, and id 
        const user = userjoin(socket.id, username, room);

        socket.join(user.room)

        //bot sends a welcome message to the user
        socket.emit('message', formatMessage(botName, `${user.username} welcome to ${user.room} room!`))

        //bot send to EVERYBODY expepts the current socket a message
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} joined the chat`))

        io.to(user.room).emit('room', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })


})





//socket.emit *** to vlepei mono to socket pou to prokalei
//socket.broadcast *** to vlepoun ola ta sockets plin tou enos pou to prokalei
//io.emit *** to vlepoun OLA ta sockets











//set Port
const port = process.env.PORT || 3000;
// start the server
server.listen(port, () => {
    console.log(`server listening on port  ${port}`);
})
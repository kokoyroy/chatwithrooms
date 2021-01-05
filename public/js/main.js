const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//get Username and Room from the Url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//join room!
socket.emit('joinChatroom', { username: username, room: room })

//get room and users
socket.on('room', ({ room, users }) => {
    outputRoomname(room)
    outputUsers(users)
})


// message from server
socket.on('message', (data) => {
    console.log(data);
    outputMessage(data)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;

})



//message submit 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get message text
    const msg = e.target.elements.msg.value;
    //emiting the message to the server
    socket.emit('chatMessage', msg)
    //clear the input
    e.target.elements.msg.value = '';

})



//output message to the dom
function outputMessage(data) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ` <p class="meta">${data.username} <span>${data.time}</span></p>
    <p class="text">${data.textMsg} </p>`;
    document.getElementsByClassName('chat-messages')[0].appendChild(div);

}
function outputUsers(usersArray) {
    console.log('to users array einai');
    console.log(usersArray);

    document.getElementById('users').innerHTML =
        `${usersArray.map(el => `<li>${el.username}</li>`).join('')}`

}
// add roomname to dom
function outputRoomname(roomname) {
    document.getElementById('room-name').textContent = roomname;
}
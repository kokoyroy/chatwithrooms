const users = []

function userjoin(id, username, room) {
    users.push({ id, username, room });
    return { id, username, room };
}
//get current user
function getCurrentUser(id) {
    return users.find(el => el.id === id)
}
//user leaves chat
function userLeaves(id) {
    const index = users.findIndex(el => el.id === id)
    const user = index > -1 ? users.splice(index, 1)[0] : null;
    return user;
}
//get room users
function getRoomUsers(room) {
    return users.filter(el => el.room === room);
}

module.exports = {
    userjoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers
}
const moment = require('moment');

function formatMessage(username, textMsg) {
    return {
        username: username,
        textMsg: textMsg,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;
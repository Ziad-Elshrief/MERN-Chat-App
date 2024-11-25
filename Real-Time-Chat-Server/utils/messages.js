const moment = require("moment-timezone");

function formatMessage(username, userId, msg) {
  return {
    username,
    userId,
    content: msg.content || "",
    image:msg.image || "",
    reply: msg.reply || "",
    replySender: msg.replySender || "",
    time: moment().tz("Africa/Cairo").format("h:mm A"),
  };
}

module.exports = { formatMessage };

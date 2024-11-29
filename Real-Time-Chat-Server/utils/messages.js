const moment = require("moment-timezone");

function formatMessage(username, userId, msg, userAvatar) {
  const messageId= `${Date.now()}-${userId}`;
  return {
    username,
    userId,
    userAvatar,
    messageId,
    content: msg.content || "",
    image: msg.image || "",
    repliedMessageId: msg.repliedMessageId || "",
    time: moment().tz("Africa/Cairo").format("h:mm A"),
  };
}

module.exports = { formatMessage };

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
    reactsList: [],
    time: moment().tz("Africa/Cairo").format("h:mm A"),
  };
}

function updateReact(reactInfo, user) {
  return {
    ...reactInfo,
    userId: user.id,
    userAvatar: user.avatar,
    username: user.username,
  };
}

module.exports = { formatMessage,updateReact };

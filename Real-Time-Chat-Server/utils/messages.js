const moment = require("moment-timezone");

function formatMessage(username, userId, content, isImage = false) {
  return {
    username,
    userId,
    content,
    isImage,
    time: moment().tz("Africa/Cairo").format("h:mm A"),
  };
}

module.exports = { formatMessage };

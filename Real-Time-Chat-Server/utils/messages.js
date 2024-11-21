const moment = require("moment");

function formatMessage(username,userId, text) {
  return {
    username,
    userId,
    text,
    time: moment().format("h:mm A"),
  };
};

module.exports = { formatMessage };

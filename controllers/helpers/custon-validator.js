const moment = require("moment");

const idDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  idDate,
};

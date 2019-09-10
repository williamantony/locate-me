const sendSuccess = data => {
  return res => {
    res.json({
      error: false,
      ...data,
    });
  };
};

const sendError = message => {
  return res => {
    res.json({
      error: true,
      message,
    });
  };
};

module.exports = {
  sendSuccess,
  sendError,
};

const initiate = (req, res, next) => {
  if (!req._) {
    req._ = {};
  }
  next();
}

module.exports = {
  initiate,
};

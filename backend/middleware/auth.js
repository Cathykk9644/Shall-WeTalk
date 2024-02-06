const checkAuth = (req, res, next) => {
  if (req.session?.userId) {
    next();
  } else {
    res.status(400).json('access denied, unathorized user');
    console.log('attempted unauthorized access');
  }
};

module.exports = checkAuth;

const isAuthenticated = (req, res, next) => {
  if (req.session.userId && req.session.role) {
    next();
  } else {
    return res.status(401).json({ msg: "Authentication required!" });
  }
};

module.exports = isAuthenticated;

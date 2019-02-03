const User = require('../models/User');

exports.tokenMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401);
  } else {
    User.findOne({ token }).exec((err, user) => {
      if (err) return res.sendStatus(500); 
      if (!user) return res.sendStatus(404); 

      req.user = user;
      next();
    })
  }
}
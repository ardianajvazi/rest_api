const User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  if (!((req.body.email || '').length && (req.body.password || '').length > 7)) {
    return res.status(400).json({ token: 'Invalid username or password' });
  }

  User.findOne({'authentication.email': req.body.email}, function(err, user) {
    if (err) {
      return res.status(400).json({msg: 'authenticate says no'});
    }

    if (user) {
      return res.status(400).json({msg: 'User exists'})
    }

    return next();
  });
};

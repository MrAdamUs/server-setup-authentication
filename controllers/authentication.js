const User = require("../models/user")

exports.signup = function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" })
  }

  // Check if a user with given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err)
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" })
    }

    // If user dose not exist
    const user = new User({
      email: email,
      password: password,
    })

    user.save((err) => {
      if (err) {
        return next(err)
      }
      res.json(user)
    })
  })
}
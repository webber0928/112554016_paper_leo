
const users = require('../../data/users.js')

module.exports = async(req, res) => {
  const { token } = req.query
  const info = users[token]
  if (!info) {
    return res.json({
      code: 50008,
      message: 'Login failed, unable to get user details.'
    })
  }
  return res.json({ code: 20000, data: info })
}

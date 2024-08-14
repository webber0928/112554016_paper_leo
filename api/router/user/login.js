
const { User } = require('../../models')

module.exports = async(req, res) => {
  const { username } = req.body

  const user = await User.findOne({
    where: {
      user_no: username,
      deleted_at: null
    }
  })

  if (!user) {
    return res.json({
      code: 60204,
      message: '[Error] 找不到使用者'
    })
  }

  const token = {
    ...user.dataValues,
    token: user.role_id === 1 ? 'editor-token' : 'admin-token',
    username
  }

  return res.json({ code: 20000, data: token })
}


const { Message, User } = require('../../models')

module.exports = async(req, res) => {
  try {
    const Sequelize = require('sequelize')
    const message = await Message.findAll({
      where: {
        user: req.params.userId
      },
      attributes: {
        exclude: ['id'],
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.fn('CONVERT_TZ', Sequelize.col('createdAt'), '+00:00', '+08:00'), '%Y-%m-%d'), 'dateDay'],
          [Sequelize.fn('DATE_FORMAT', Sequelize.fn('CONVERT_TZ', Sequelize.col('createdAt'), '+00:00', '+08:00'), '%H:%i:%s'), 'dateTime']
        ]
      }
    })

    if (message.length) {
      let userId = message[0].user
      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      message = message.map((item) => {
        item.user = user.user_no
        return item
      })
    }

    return res.json({ code: 20000, data: message })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

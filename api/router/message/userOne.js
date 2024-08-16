const { Message } = require('../../models')

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

    return res.json({ code: 20000, data: message })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

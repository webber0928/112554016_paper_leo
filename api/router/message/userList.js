
const _ = require('lodash')
const { Message, User } = require('../../models')

module.exports = async(req, res) => {
  try {
    const Sequelize = require('sequelize')
    const message = await Message.findAll({
      where: {},
      attributes: [
        'user',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
      ],
      group: ['user'],
      raw: true
    })

    const userObj = message.reduce((obj, item) => {
      obj[item.user] = item
      return obj
    }, {})

    const userModel = await User.findAll({
      where: {
        id: Object.keys(userObj),
        deleted_at: null
      },
      attributes: {
        exclude: ['updatedAt', 'deleted_at', 'role_id', 'createdAt'],
        include: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.fn('CONVERT_TZ', Sequelize.col('createdAt'), '+00:00', '+08:00'), '%Y-%m-%d %H:%i:%s'), 'created_date']
        ]
      },
      raw: true
    })

    userModel.forEach(item => {
      userObj[item.id] = {
        ...item,
        count: userObj[item.id].count
      }
    })

    return res.json({ code: 20000, data: _.orderBy(userObj, ['user_no', 'count'], ['asc', 'desc']) })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

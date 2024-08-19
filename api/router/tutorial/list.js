
const { Tutorial } = require('../../models')

module.exports = async(req, res) => {
  const items = await Tutorial.findAll({
    where: {
      deleted_at: null
    },
    order: [['ranking', 'ASC']]
  })
  return res.json({ code: 20000, data: {
    total: items.length,
    items: items
  }})
}


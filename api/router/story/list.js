
const { Story } = require('../../models')

module.exports = async(req, res) => {
  const items = await Story.findAll({
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


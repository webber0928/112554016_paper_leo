
const { Story } = require('../../models')

module.exports = async(req, res) => {
  const item = await Story.findOne({
    where: {
      id: req.params.id,
      deleted_at: null
    }
  })
  return res.json({ code: 20000, data: item })
}


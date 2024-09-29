
const { Tutorial } = require('../../models')

module.exports = async(req, res) => {
  const item = await Tutorial.findOne({
    where: {
      id: req.params.id,
      deleted_at: null
    }
  })
  return res.json({ code: 20000, data: item })
}



const { Trigger } = require('../../models')

module.exports = async(req, res) => {
  const { word = null, type = null } = req.params
  const { user_no, story_id } = req.body
  try {
    if (!word) throw Error('資料有問題')
    if (!type) throw Error('資料有問題')
    const result = await Trigger.findOne({
      where: {
        user_no,
        story_id,
        word,
        type,
        deleted_at: null
      }
    })

    if (result) {
      result.set('count', result.count + 1)
      await result.save()
    } else {
      await Trigger.create({
        user_no,
        story_id,
        word,
        type,
        count: 1
      })
    }

    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}


const { Story } = require('../../models')

module.exports = async(req, res) => {
  const { title, content, ranking, words = [] } = req.body
  try {
    const item = await Story.findOne({
      where: {
        id: req.params.id,
        deleted_at: null
      }
    })

    const formatWords = JSON.stringify(words)

    if (title && item.title !== title) {
      item.set('title', title)
    }
    if (content && item.content !== content) {
      item.set('content', content)
    }
    if (words && item.words !== words) {
      item.set('words', formatWords)
    }

    if (ranking) item.set('ranking', ranking)
    await item.save()

    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}



const { Tutorial } = require('../../models')

module.exports = async(req, res) => {
  const { title, content, ranking, promptId, link = [] } = req.body
  try {
    const item = await Tutorial.findOne({
      where: {
        id: req.params.id,
        deleted_at: null
      }
    })

    const formatLinks = JSON.stringify(link)

    if (title && item.title !== title) {
      item.set('title', title)
    }
    if (content && item.content !== content) {
      item.set('content', content)
    }
    if (promptId && item.promptId !== promptId) {
      item.set('promptId', promptId)
    }
    if (link && item.link !== link) {
      item.set('link', formatLinks)
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


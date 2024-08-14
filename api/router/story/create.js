
const { Story } = require('../../models')

module.exports = async(req, res) => {
  const { title, content, words = [] } = req.body
  try {
    if (!title || !content) throw Error('資料有問題')
    const item = await Story.findAll({
      where: {
        deleted_at: null
      }
    })

    const formatWords = JSON.stringify(words)
    await Story.create({
      title,
      content,
      words: formatWords,
      ranking: item.length + 1
    })
    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}


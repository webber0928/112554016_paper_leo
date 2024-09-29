
const { Tutorial } = require('../../models')

module.exports = async(req, res) => {
  const { title, content, prompt, link = [] } = req.body
  try {
    if (!title || !content) throw Error('資料有問題')
    const item = await Tutorial.findAll({
      where: {
        deleted_at: null
      }
    })

    const formatWords = JSON.stringify(link)
    await Tutorial.create({
      title,
      content,
      prompt,
      link: formatWords,
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


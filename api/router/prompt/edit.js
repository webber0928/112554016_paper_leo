const { Chatbot } = require('../../models')

module.exports = async(req, res) => {
  const { prompt } = req.body
  try {
    const chatbot = await Chatbot.findOne({
      where: {
        type: 'questionPrompt',
        deleted_at: null
      }
    })

    chatbot.set('prompt', prompt)
    await chatbot.save()

    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

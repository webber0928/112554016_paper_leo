const { Chatbot } = require('../../models')

module.exports = async(req, res) => {
  try {
    const chatbot = await Chatbot.findOne({
      where: {
        type: 'questionPrompt',
        deleted_at: null
      }
    })

    return res.json({ code: 20000, data: chatbot })
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
}

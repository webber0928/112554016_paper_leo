
const axios = require('axios')
const API_KEY = require('../../../apiKey.js').API_KEY

module.exports = async(req, res) => {
  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      'model': 'gpt-4o-mini',
      'messages': [
        {
          'role': 'system',
          'content': '你是一位富有創意的國小五年級英文老師 目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式'
        },
        {
          'role': 'user',
          'content': '目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式 學習內容： park, library, hospital, supermarket, bookstore, tea shop, post office, zoo, Where are you going? I’m going to the _______. Where’s the ________? It’s on ____ Road. It’s next to the zoo.'
        }
      ]
    }
  }

  try {
    const response = await axios(config)
    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error)
    res.status(500).send('Unable to fetch data from external API.')
  }
}


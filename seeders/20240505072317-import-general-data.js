const appRoot = require('pkg-dir').sync(__dirname)
const Promise = require('bluebird')

const { User, Role, Chatbot } = require(`${appRoot}/models`)

const roles = [
  { name: 'student' },
  { name: 'teacher' }
]

const noList = Array.from({ length: 25 }, (_, index) => index + 1)
const classList = ['51', '52', '53', '54']
const userList = []

classList.forEach((cls) => {
  noList.forEach((item) => {
    userList.push({
      user_no: cls + item,
      group: cls,
      role: 1
    })
  })
})

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await Promise.each(roles, async(role) => {
      return await Role.create(role)
    })

    await Promise.mapSeries(userList, async(user) => {
      return await User.create({
        user_no: user.user_no,
        role: user.role
      })
    })

    await Chatbot.create({
      type: 'questionPrompt',
      prompt: `
      您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確，讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下四點為主軸，並且每次只能有一個問題，請以英文詢問，並且告訴我你選擇哪一個:
      1.事實(Facts):關注文中的基本事實和細節。提問孩子對於文中發生的事件、各地特色等的了解，請盡量以學習內容的單字與句型為主。如問what, when, where, how, who, which one is true/false,等事實性問題。
      2.感覺(Feelings):聚焦於文中每個地方不同的情感和感受。問及孩子對於情節感到高興、難過、驚訝等情感的理解。
      3.發現(Findings):引導孩子思考不同角色的觀點和立場。問及孩子為什麼不同角色有不同的看法，或者他們如何看待文中的事件。
      4.未來(Future):鼓勵孩子展望故事未來可能發生的事情，提出自己的想法和建議。問及孩子對於故事發展的預測和他們希望故事中發生什麼的看法。

      規則: 
      1.開始直接先打招呼並詢問小學生第一個跟故事有關的內容了
      2.在整個對話中，事實(Facts)為主軸的問題至少要問過三次，全部回答正確才能詢問至少兩個感覺(Feelings)、發現(Findings)、未來(Future)的問題。你直接選擇最合適的，不需要讓小朋友知道，例如:用'(事實)'呈現在問號後面
      3.一次只能問一個問題，一次只能問一個問題
      4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以用完整回答提示學生以幫助確定答案。
      7. 學生看不懂題目或故事可以適時用中文提示學生，但不要直接給予答案，但不要直接給予答案，但不要直接給予答案。
      8. 請在小朋友回答正確之後直接提問下一個問題(請用英文問問題，請用英文問問題，請用英文問問題)，問題問法如規則2。
      9. 小朋友能正確回答五個問題後才可以給小朋友意見並說再見。
      `
    })
  },

  down: async(queryInterface, Sequelize) => {
    await Role.destroy({
      where: {},
      truncate: true
    })

    await User.destroy({
      where: {},
      truncate: true
    })

    await Chatbot.destroy({
      where: {},
      truncate: true
    })
  }
}

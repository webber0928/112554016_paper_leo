var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/user/login',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "username": 'admin'
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
const request = require('request');


var startButtonHandler = ()=>{
    var  response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "What is your specialty?",
              "buttons": [
                {
                  "type": "postback",
                  "title": "FullStack",
                  "payload": "specialty",
                },
                {
                    "type": "postback",
                    "title": "Backend",
                    "payload": "specialty",
                },
                {
                    "type": "postback",
                    "title": "Frontend",
                    "payload": "specialty",
                }
              ],
            }]
          }
        }
      }

      return response;
};




module.exports = {
    startButtonHandler
};
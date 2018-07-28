 const request = require('request');


 const {specialtyButtonHandler ,experienceButtonHandler ,locationButtonHandler} =require('./buttonsHandlers');
 const {firstEntity} =require('./nlpHandler');
 

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // check NLP
    const nlp = firstEntity(received_message.nlp, 'greetings');
    if (nlp && nlp.confidence > 0.8) {
        response = {
            "text": `Hi there`
          }
    }
    // Checks if the message contains text
    else if (received_message.text) {    
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
      }
    
    } else if (received_message.attachments) {
      // Get the URL of the message attachment
      let attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ],
            }]
          }
        }
      }
    } 
    
    // Send the response message
    callSendAPI(sender_psid, response);    
  }


// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": "EAADFkqgUKZB0BAISysqkaFSh5iSczaTSfYVI7jagYvvaAHsKpXskN9wwFlNvsl6U0QG7ZAJsgE6pHyKuAjfNC4YbVpfFShZBZA5dmTJFyAhZB70qZAcYPtDcL0f9gjJvq1xp2nrKHcyByg0MfIRXmv0m2NcfT1hHJ6zWESDIzinwZDZD" },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }


  // Handles messaging_postbacks events
  function handlePostback(sender_psid, received_postback) {
    let response;
    
    // Get the payload for the postback
    let payload = received_postback.payload;

    switch(payload){
        case 'get_started':{
            response = specialtyButtonHandler();
            break;
        }
        case 'specialty':{
          response = experienceButtonHandler();
          break;
       }
        case 'experience':{
            response = locationButtonHandler();
            break;
        }
        case 'location':{
            response ={ "text": "Searching for you (: " };
            break;
        }
        case 'yes':{
            response = { "text": "Thanks!" }
            break;
        }
        case 'no':{
            response = { "text": "Oops, try sending another image." }
            break;
        }
    }
   
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
  }

      



  module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI,
  };
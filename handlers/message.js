 const request = require('request');


 const {specialtyButtonHandler ,experienceButtonHandler ,locationButtonHandler} =require('./buttonsHandlers');
 const {firstEntity} =require('./nlpHandler');
 
 var searchValues = {
  'specialty': [],
  'experience': [],
  'location': []
 };

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    
    // Checks if the message contains text
     if (received_message.text) {    
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      // check NLP
      const nlp = firstEntity(received_message.nlp, 'greetings');
      if (nlp && nlp.confidence > 0.8) {
          response = {
              "text": `Hi there`
            }
      }
      else {
        response = {
          "text": `You sent the message: "${received_message.text}". I'm not sure what to do.`
        }
      }
     
    }
    //if not a text
    else{
      response = {
        "text": `I'm not sure what to do with that.`
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
    let title  = received_postback.title;

    switch(payload){
        case 'get_started':{
            response = specialtyButtonHandler();
            break;
        }
        case 'specialty':{
          searchValues.specialty.push(title);
          response = experienceButtonHandler();
          break;
       }
        case 'experience':{
            searchValues.experience.push(title);
            response = locationButtonHandler();
            break;
        }
        case 'location':{
            searchValues.location.push(title);
            response ={ "text": `Searching for you (: Looking for a ${searchValues.experience[0]} ${searchValues.specialty[0]} position in ${searchValues.location[0]} region.`};
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
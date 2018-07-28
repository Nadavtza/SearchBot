const {specialtyButtonsList,locationButtonList ,experienceButtonList} =require('./buttons');


var specialtyButtonHandler = ()=>{
    return createbuttonList("What is your specialty?",specialtyButtonsList);
};


var experienceButtonHandler = ()=>{
    return createbuttonList("Experience level?",experienceButtonList);
};

var locationButtonHandler = ()=>{
    return createbuttonList("Where?",locationButtonList);
};



var createbuttonList = (title , buttonList)=>{
    var  response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": title,
              "buttons": buttonList
            }]
          }
        }
      }
     
      return response;
};


module.exports = {
    specialtyButtonHandler,
    experienceButtonHandler,
    locationButtonHandler
};
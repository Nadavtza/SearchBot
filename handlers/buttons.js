var specialtyButtonsList = [
    {
        "type": "postback",
        "title": "FullStack",
        "payload": "specialty",
    },
    {
        "type": "postback",
        "title": "BackEnd",
        "payload": "specialty",
    },
    {
        "type": "postback",
        "title": "FrontEnd",
        "payload": "specialty",
    }
];

var locationButtonList = [
    {
        "type": "postback",
        "title": "Gush Dan",
        "payload": "location",
    },
    {
        "type": "postback",
        "title": "Sharon",
        "payload": "location",
    },
    {
        "type": "postback",
        "title": "Shephelah",
        "payload": "location",
    }
];

var experienceButtonList = [
    {
        "type": "postback",
        "title": "Junior",
        "payload": "experience",
    },
    {
        "type": "postback",
        "title": "Intermediate",
        "payload": "experience",
    },
    {
        "type": "postback",
        "title": "Senior",
        "payload": "experience",
    }
];

module.exports = {
    specialtyButtonsList,
    locationButtonList,
    experienceButtonList
};

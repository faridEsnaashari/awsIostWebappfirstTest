express = require('express');
thingShadow = require('./thingShadow');
statusHandler = require('./statusHandler');

app = express();

app.listen(3000)

let response;
let request;

let topicAnswered = {
	answerToGet : null,
	answerToUpdate : null
};

app.get('/', (req, res) => {
	thingShadow.get('dev1');
	response = res;
}); 


thingShadow.topic.on('publishedToGet', (clientToken) => {
	topicAnswered.answerToGet = clientToken;
});


thingShadow.topic.on('someTopicAnswered', (thingName, stat, clientToken, stateObject) => {
        console.log('topic : ' + topicAnswered.answerToGet);
        console.log('incommingCT : ' + clientToken);    
        let responseJSON = statusHandler(thingName, stat, clientToken, stateObject, topicAnswered)
        response.json(responseJSON);
});
//	console.log('thingName' + thingName);
//	console.log('stat' + stat);
//	console.log('clientToken' + clientToken);
//	response.end(JSON.stringify(stateObject, null, 5))
	




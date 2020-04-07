express = require('express');
thingShadow = require('./thingShadow');
statusHnadler = require('./statusHandler');

app = express();

app.listen(3000)

let response;
let request;

let topicAnswered = {
	answerToGet : null,
	answerToUpdate : null
};

app.get('/', (req, res) => {
	topicAnswered.answerToGet = thingShadow.get('dev1');
	response = res;
}); 



thingShadow.response.on(
	'status',
	 (thingName, stat, clientToken, stateObject, response, topicAnswered) => {
		let responseTextString = statusHandler(thingName, stat, clientToken, stateObject, topicAnswered)
		response.end(responseTextString);
	}
);
//	console.log('thingName' + thingName);
//	console.log('stat' + stat);
//	console.log('clientToken' + clientToken);
//	response.end(JSON.stringify(stateObject, null, 5))
	


thingShadow.response.on('message', (topic, msg) => {
	console.log(topic);
	console.log(msg.toString());
});


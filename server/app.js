express = require('express');
thingShadow = require('./thingShadow');
statusHandler = require('./statusHandler');
bodyParser = require('body-parser');

app = express();

app.listen(3000);

let response;
let request;

let topicAnswered = {
	answerToGet : null,
	answerToUpdate : null
};

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
	thingShadow.get('dev1');
	response = res;
}); 

app.post('/', (req, res) => {
	let stateObject = {
		'color' : req.body.color,
		'temp' : req.body.temp
	};
	thingShadow.update('dev1', stateObject);
	response = res;
}); 

thingShadow.topic.on('publishedToUpdate', (clientToken) => {
	topicAnswered.answerToUpdate = clientToken;
});



thingShadow.topic.on('publishedToGet', (clientToken) => {
	topicAnswered.answerToGet = clientToken;
});


thingShadow.topic.on('someTopicAnswered', (thingName, stat, clientToken, stateObject) => {
        let responseJSON = statusHandler(thingName, stat, clientToken, stateObject, topicAnswered)
		topicAnswered = {
			answerToGet : null,
			answerToUpdate : null
		};
       response.json(responseJSON);
});
	




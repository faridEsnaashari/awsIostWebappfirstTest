express = require('express');
thingShadow = require('./thingShadow');

app = express();

app.listen(3000)

let response;
let request;

app.get('/', (req, res) => {
	thingShadow.get('dev1')
	response = res;
}); 



thingShadow.response.on('status', (thingName, stat, clientToken, stateObject) => {
//	console.log('thingName' + thingName);
//	console.log('stat' + stat);
//	console.log('clientToken' + clientToken);
//	response.end(JSON.stringify(stateObject, null, 5))

});

thingShadow.response.on('message', (topic, msg) => {
	console.log(topic);
	console.log(msg.toString());
});


const awsIot = require('aws-iot-device-sdk');
const events  = require('events');

const topic = new events.EventEmitter();

const thingShadow = awsIot.thingShadow({
	keyPath: './auth/a298c2e5d7-private.pem.key',
	certPath: './auth/a298c2e5d7-certificate.pem.crt',
	caPath: './auth/root-CA.pem',
	clientId: 'dev',
	host: 'a1bd04rd9e0js1-ats.iot.us-west-2.amazonaws.com'
});

thingShadow.on('connect', () => {
	console.log('device connected');
});

let _get = (thingName) => {
	thingShadow.register(thingName, null, () => {
		let clientToken = thingShadow.get(thingName);
		topic.emit('publishedToGet', clientToken);
	});
};



let _update = (thingName, state) => {
	thingShadow.register(thingName, null, () => {
		let awsStateObject = {
			'state' : {
				'desired' : state
			}
		};
		let clientToken = thingShadow.update(thingName, state);
		topic.emit('publishedToUpdate', clientToken);
	});
};




thingShadow.on('status', (thingName, stat, clientToken, stateObject) => {
	topic.emit('someTopicAnswered', thingName, stat, clientToken, stateObject);
	thingShadow.unregister('dev1');
});

module.exports = {
	get : _get,
	topic : topic,
	update : _update
};

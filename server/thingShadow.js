const awsIot = require('aws-iot-device-sdk');

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
		return clientToken;
	});
};

module.exports = {
	get : _get,
	response : thingShadow
};

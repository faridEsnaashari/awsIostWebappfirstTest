const statusHandler = (thingName, stat, clientToken, stateObject, topicAnswered) => {
	let responseJSON = null;
	if(clientToken === topicAnswered.answerToGet){
		responseJSON = handleGetAcceptedResponse(stateObject);
	}
	else if(clientToken === topicAnswered.answerToUpdate){
		responseJSON = handleUpdateAcceptedResponse(stateObject);		
	}
	return responseJSON;
};


function handleUpdateAcceptedResponse(stateObject){
	const responseJSON = {
		'ok' : true
	};
	return responseJSON; 
}



function handleGetAcceptedResponse(stateObject){
	const responseJSON = {
		'ledColor' : stateObject.state.desired.color,
		'temp' : stateObject.state.desired.temp
	};
	return responseJSON;
}



module.exports = statusHandler; 

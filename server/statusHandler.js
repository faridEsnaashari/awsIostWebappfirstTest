const statusHandler = (thingName, stat, clientToken, stateObject, topicAnswered) => {
	let responseText = null;
	if(clientToken === topicAnswered.answerToGet){
		responseText = handleGetAcceptedResponse(stateObject);
	}
	else if(clientToken === topicAnswered.answerToUpdate){
		//responseText = handleUpdateAcceptedResponse(stateObject);		
	}
	return responseText;
};


function handleGetAcceptedResponse(stateObject){
	console.log(typeof stateObject);
	console.log(JSON.stringify(stateObject, null, 5));
}



module.exports = statusHandler; 

window.addEventListener('DOMContentLoaded', () => {
});



function sendDataToServer(){
	const colorValue = document.getElementById('colorid').value;
	const tempValue = document.getElementById('tempid').value;
	
	console.log(colorValue);
	console.log(tempValue);
	
	const httpSender = new XMLHttpRequest();
	httpSender.open('POST', 'localhost:3000', true);
	httpSender.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpSender.send('color=' + colorValue + '&temp=' + tempValue);
}

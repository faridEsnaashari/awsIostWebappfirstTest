window.addEventListener('DOMContentLoaded', () => {
    setInterval(getDataFromServer, 1000);
});



function sendDataToServer(){
	const colorValue = document.getElementById('colorid').value;
	const tempValue = document.getElementById('tempid').value;
	
	const httpSender = new XMLHttpRequest();
	httpSender.open('POST', 'https://deviceshadowapiserver-fandoghnamespace.fandogh.cloud', true);
	httpSender.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpSender.send('color=' + colorValue + '&temp=' + tempValue);
}



function getDataFromServer(){
    const colorValue = document.getElementById('reportedColor');
    const tempValue = document.getElementById('reportedTemp');

	const httpSender = new XMLHttpRequest();
	httpSender.open('GET', 'https://deviceshadowapiserver-fandoghnamespace.fandogh.cloud', true);
	httpSender.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpSender.send();

    httpSender.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const reportedValue = JSON.parse(this.responseText);

            colorValue.value = reportedValue.ledColor;
            tempValue.value = reportedValue.temp;

            console.log(typeof this.responseText);

        }
    };
}

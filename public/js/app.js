let weatherForm = document.querySelector('form');
let timezone = document.getElementById('location');
let tempereture = document.getElementById('weather');
let probability = document.getElementById('probability');
let percipitation = document.getElementById('percipitation');
let input = document.getElementById('inp');


weatherForm.addEventListener('submit', (event) => {
	      errorCleaning()
	      loadingParagraph()
	      event.preventDefault()
		  const data = fetch('/about?adresse=' + input.value.toString())
	     .then(response => {
	       response.json().then((data) => {
	      	if(data.error) {
	      		 errorDataMessage(data.error);
	      		 clearInput()
	      	} else {
				   let finalData = data.weatherInfo;
	      		   errorCleaning() 
	      		   cleanerParagraph();
	      		   clearInput();
	      		   timezone.innerText += " Zone: " + data.weatherInfo.timezone;
	      		   tempereture.innerText += " Temperature: " + data.weatherInfo.temperature;
	      		   probability.innerText += " Probebility: " + data.weatherInfo.precipProbability;
	      		   percipitation.innerText += " Condition: " + data.weatherInfo.precipType;

            	}
           })
       })
                  event.stopPropagation();
 })
	

	function cleanerParagraph() {
		 let p = document.querySelectorAll('P');
		  for(var i = 1; i < p.length-1; i++){
		     p[i].innerText = "";
		     p[i].style.color = "black";
		  }

	}


	function loadingParagraph() {
		 let p = document.querySelectorAll('P');
		  for(var i = 1; i < p.length-1; i++){
		     p[i].innerText = "Loading...";
		  }
	}


	function errorDataMessage(error) {
		let p = document.querySelectorAll('P');
		  for(var i = 1; i < p.length-1; i++){
		     p[i].innerText = error;
		     p[i].style.color = "red";
		  }
	}


	function clearInput() {
		return input.value = "";
	}


	function errorCleaning() {
		let p = document.querySelectorAll('P');
		  for(var i = 1; i < p.length-1; i++){
		     p[i].style.color = "black";
		  }
	}

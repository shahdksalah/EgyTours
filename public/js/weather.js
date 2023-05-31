//api by city from rapidapi just added units=metric for celsius
const url = 'https://open-weather13.p.rapidapi.com/city/luxor,egypt&units=metric';

//get the opject on the console

fetch(url, {

    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '107d21e679msh02cebba2d06535cp190c4fjsn4e5b6f70b4e1',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}

})
.then(response =>response.json())
.then(response => {
    console.log(response);

})
.catch( err => {
    console.log(err);
});

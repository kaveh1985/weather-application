const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Define paths for Express congif
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// app.set('views', partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));




app.get('', (req, res) => {
	res.render('index', {
		name: "kaveh",
		country: "France",
		title: "Home Page"
	});
})


app.get('/test', (req, res) => {
	res.render('test')
})



app.get('/about', (req, res) => {
	const adresse = req.query.adresse;
	if(!adresse){
		return res.send({
			error: "The adresse must be provided!"
		})
	} 
		 geocode(adresse, (error, { latitude, longitude } = {} ) => {
	         if(error) {
	         return	res.send({
	         		error
	         	})
	         } 
	         	forecast(latitude, longitude, (error, foreCast) => {
                        if(error) {
                        	return res.send({
                        		error
                        	})
                          } 
                      res.json({
                       adresse: adresse,
                       weatherInfo: foreCast
           })
	    })
     })
  })




app.get('/help', (req, res) => {
	res.render('help', {
		name: 'kaveh',
		title: "Help"
	});
})


app.get('/help/*',(req, res) => {
	res.render('error',{
		error: 404,
		page: "Help Not Found"
	})
})



app.get('*',(req, res) => {
	res.render('error', {
		error: 404,
		page: "Page Not Found"
	})
})



app.listen(port, () => {
	console.log('listening on port' + port);
});
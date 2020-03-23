const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
	res.render('index',{
		title: 'Weather',
		name: 'Andrew Mead'
	})
})

app.get('/about',(req,res) => {
	res.render('about',{
		title: 'About me',
		name: 'Andrew Mead'
	})
})

app.get('/help',(req,res) => {
	res.render('help',{
		title: "Help",
		name: "Abdrew"
	})
})

app.get('/help/*',(req,res) => {
	res.render('404',{
		title: "404",
		name: "Abdrew",
		message: 'Help article not found'
	})
})

app.get('/weather',(req,res) => {
	if(!req.query.adress){
		return res.send({error:'You must provide adress'})
	}
	geocode(req.query.adress,(err,{latitude,longitude,location} = {})=>{
		if(err){
			res.send({error: err})
		}
		else{
			forecast(latitude,longitude,(err,data) => {
				if(err){
					res.send({error: err})
				}
				else{
					res.send({
						forecast: data,
						location,
						addres: req.query.adress
					})
				}
			})
		}
	})

	
})

app.get('/products',(req,res) => {
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search)
	res.send({
		products: []
	})
})


app.get('*',(req,res) => {
	res.render('404',{
		title: "404",
		name: "Abdrew",
		message: 'Page not foung'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})
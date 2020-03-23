 const request = require('request')

const forecast = (lat,lon,callback) => {
	const url = `https://api.darksky.net/forecast/836bc47289f7767abf3597fecdb5f52b/${lat},${lon}?units=si`
	request({url,json:true},(err,{body}) => {
		if(err){
			callback('Unable to connect to weather service',undefined)
		}
		else if(body.error){
			callback('Unable to find location',undefined)
		}
		else{
			callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature}.This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chance of rain`)
		}

	})
}

module.exports = forecast
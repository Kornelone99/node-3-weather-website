 const request = require('request')

 const geoCode = (adress,callback) => {
 	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1Ijoia29ybmVsb25lOTkiLCJhIjoiY2s4MmU4Z2VqMGYwcTNscHRjeGt6N29waSJ9.hXQoWRdxDDLrpvtMxpo7NQ&limit=1'`
 
 	request({url,json:true},(err,{body}) => {
 		if(err) {
 			callback('Unable to connect!!',undefined)
 		}else if(body.features.length == 0){
 			callback('Wrong location!!',undefined)
 		}else{
 			callback(undefined,{
 				latitude: body.features[0].center[1],
 				longitude: body.features[0].center[0],
 				location: body.features[0].place_name
 			})
 		}
 	})
 }

 module.exports = geoCode
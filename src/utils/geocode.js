const request = require('request')

const geoCode = (address,callBack) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1hbmJhaW5zLWVyIiwiYSI6ImNrODR4aTZ1cTAxM2MzZW1uN2NqZ3Z2YXYifQ.xfD0y6pAaseMYfVS5Y3y3A&limit=1'
    request({url, json:true}, (error,{body}) =>
    {
        if(error)
        {
            callBack('Unable to connect to weather service .',undefined)  
        }else if(body.features.length === 0)
        {
            callBack('Unable to find the location.  Please try again with different location',undefined)
        }else
        {
            callBack(undefined,{
            latitude :body.features[0].center[1],
            longtitude : body.features[0].center[0],
            location : body.features[0].place_name
            }
            )
           
    }
}
)}



module.exports = geoCode
const request = require('request')

const weatherForcast = (latitude,longitude, callBack) =>
{
    const url = 'https://api.darksky.net/forecast/2c8737f2c1d9cc8b76eba9a9815bba8e/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)+''
    request({url, json:true} , (error,{body}) =>
    {
        if(error){
            callBack('Unable to connect to weather service',undefined)
        }else if(body.error){
            callBack("Unable to find the location",undefined)
        }else{
            callBack(undefined,'It is currently ' + body.currently.temperature + '  degrees out there with ' + body.currently.precipProbability + '% chances of rain and the humidity is ' + body.currently.humidity
            )
        }

    }
    )
}

module.exports= weatherForcast
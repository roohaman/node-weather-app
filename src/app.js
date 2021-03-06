const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geoCode = require('./utils/geocode')
const weatherForcast = require('./utils/weatherForcast')

//setting path variables
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')
//setting handlebars
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(path.join(__dirname,'../public')))

//home page
app.get('',(req,res) =>
{
    res.render('index',{
        title:'Weather app',
        name:'Aman'
        
    })
})

//about page
app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title: 'About Me',
        name:'Amandeep'
    })
})

//help page
app.get('/help',(req,res)=>
{
    res.render('help',{
        helpText:'This is an examp text',
        title: 'Help',
        name: 'Aman'
       
    })
})
app.get('/help/*', (req,res) =>
{
    res.render('error',{
    title: 'Help Error',
    name: 'Aman',
    errorMessage:'Help article not found'}
    )

})

app.get('/products',(req,res)=>
{
    if(!req.query.search){
       return res.send({
            error:'Please provide a search query'
        })
    }
   // console.log(req.query.search)
    res.send(
        {
            products : []
        }
    )
})

//weather page
app.get('/weather',(req,res)=>
{
    if(!req.query.address){
       return res.send(
            {
                error:'Please provide a location'
            }
       )
      
    }
    geoCode(req.query.address,(error,{latitude,longtitude,location}={}) =>
        {
            if(error){
                return res.send({error})
            }

            weatherForcast(latitude,longtitude,(error,forcastData) =>
            {
                if(error){
                    return res.send({error})
                }
                res.send(
                    {
                        forcast: forcastData,
                        location,
                        address: req.query.address
                    }
                )
            }

            )
        }
         
        )
})


app.get('*',(req,res)=>
{
    res.render('error', {
        title: 'error',
        name: 'Aman',
        errorMessage: '404,Page not found'
    })
})

app.listen(port,() =>
{
    console.log('Server is up at port ' + port)
})
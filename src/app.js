const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')
const weatherForcast = require('./utils/weatherForcast')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public/about.html'))

//app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res) =>
{
    res.render('index',{
        title:'Weather app',
        name:'Aman'
        
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title: 'About Me',
        name:'Amandeep'
    })
})

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

    //console.log(req.query.location)
    /*res.send(
        {

            forcast:'Its going to rain today',
            location:'Toronto',
            address : req.query.address
        }
    )*/
})


app.get('*',(req,res)=>
{
    res.render('error', {
        title: 'error',
        name: 'Aman',
        errorMessage: '404,Page not found'
    })
})



app.listen(3000,() =>
{
    console.log('Server is up at port 3000')
})
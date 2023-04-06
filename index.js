import express from 'express'

const url = 'https://api.vinimini.fdnd.nl/api/v1/'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')

// public map 
app.use(express.static('public'))

// afhandeling van formulieren
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes/path gemaakt voor mijn index | proces | agenda pagina's 
app.get('/', (request, response) => {
  fetchJson(url + '/producten').then((data) => {
    response.render('index', data)
  })
})

app.get('/proces', (request, response) => {
  response.render('proces')
})

app.get('/producten', (request, response) => {
  fetchJson(url + '/producten').then((data) => {
    response.render('producten', data)
    // console.log(data)
  })
})

app.get('/agenda', (request, response) => {
  const url2 = 'notities?id=clemozv3c3eod0bunahh71sx7'
  const notitieUrl = url + url2 
  
  fetchJson(notitieUrl).then((data) => {
    response.render('agenda', data)
  })
})

// Post note (notitie) to API
app.post('/agenda', function (req, res, next) {

  req.body.afgerond = false
  //req.body.persoonId = 'clemozv3c3eod0bunahh71sx7'
  req.body.datum = req.body.datum + ':00Z';
  req.body.herinnering = [req.body.herinnering + ':00Z']
  console.log(req.body)
  
  postJson(url + '/notities', req.body).then((data) => {

    // console.log(JSON.stringify(data))

    let newNotitie = { ... req.body }
    
    if (data.success) {
      res.redirect('/agenda') 
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina
    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
      const newdata = { error: errormessage, values: newNotitie }
      
      res.render('agenda', newdata)
    }
  })
});

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}
/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}
> _Fork_ deze leertaak en ga aan de slag. Onderstaande outline ga je gedurende deze taak in jouw eigen GitHub omgeving uitwerken. De instructie vind je in: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)

# Vinimini | Mini Notitie

<img src="https://user-images.githubusercontent.com/112857932/230028878-34d8d2b5-4790-402b-b295-1d36ef34a7a6.png" width="100%">


## 📚 Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Ik heb een Notitie formulier gemaakt waar de gebruiker "ouders" notities kunnen typen en achterlaten.

- Userstory: Als ouder wil ik in een dagboek aantekeningen kunnen maken zodat ik niet vergeet wat er is gebeurd.


## Gebruik
<!--Bij Gebruik staat hoe je project er uit ziet, hoe het werkt en wat je er mee kan. -->
Je kunt deze formulier gebruiken om een notities te schrijven en te posten, je kan je notitie ook terug zien op de zelfde pagina.

## Kenmerken
Voor dit project heb ik gebruik gemaakt van ``` node.js ``` | ``` Express ``` | ```Ejs``` | client-side ``` JavaScript ``` en tijdens het bouwen van mijn interactie probeerde ik de progressive enhancement methode te volgen.

**Progressive Enhancement** is een benadering van webdesign en ontwikkeling die zich richt op het bouwen van de kernfunctionaliteit van een website op een manier die werkt voor alle gebruikers, ongeacht hun apparaat of browsermogelijkheden.

**Zie** hieronder hoe ik deze formulier heb gemaakt:

- Html
```html
<div class="note">
  <h1>Mini Notities</h1>

  <% if (typeof(error) != 'undefined') { %>
  <strong>Er ging iets mis!</strong>
  <% } %>

  <div class="form">
    <form action="/agenda" method="post">
      <input type="hidden" name="persoonId" value="clemozv3c3eod0bunahh71sx7">
      <fieldset class="notitieFieldset">
        <label>
          Titel <span>(Notitie)</span>
          <input id="input" type="text" required name="titel" />
        </label>

        <label>
          Notitie <span>(Beschrijving)</span>
          <input id="input" type="text" required name="beschrijving" />
        </label>

        <label
          >Datum
          <input id="input" type="datetime-local" required name="datum" />
        </label>

        <label
          >Herinnering
          <input id="input" type="datetime-local" required name="herinnering" />
        </label>
      </fieldset>

      <button class="notitieSubmit" type="submit">Toevoegen</button>
    </form>
  </div>
  <h1> Jouw Notities</h1>
  <section class="test9">
    <% notities.forEach(notitie => { %>
      <article class="test8">
         <h3>Titel:</h3> 
         <p> <%= notitie.titel %> </p>
         <h3>Notitie:</h3> 
         <p> <%= notitie.beschrijving %></p>    
       </article>
         <% }); %>
  </section>
</div>
```

- NodeJs
```js
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
```
- Css Styling 
```css
.note{
  border-radius: 10px;
  box-shadow: 2px 2px 20px var(--lightGreen);
  padding: 10px;
  margin: 14px;
  margin: 0 auto;
  align-items: center;
  width: 80%;
  margin-bottom: 2rem;
}

.notitieFieldset{
  display: grid;
  gap: 1rem;
  background-color: var(--black);
  border: none;
  margin-bottom: 1em;
  background: #e4f2f2;
  border: 1px solid #b5dbdc;
}

.note h1{
  text-align: center;
  color: var(--lightGreen);
}
```

## Installatie
Ga eerst naar nodejs.org en installeer de Node ontwikkelomgeving. Voor dit project heb ik gebruik gemaakt van 18.14.0 LTS, download de benodigde bestanden en doorloop het installatieproces. Daarna open Visual Studio Code - terminal en installeer Node doormiddel van het commando npm innit, voer hierna npm install uit, om de pagina te open start je een server op door middel van npm start en als de server weer gesloten moet worden kan je control + c / ^c gebruiken op mac.

## Bronnen
- Stof | Workshops
- Codepen | "https://codepen.io/solideagency/pen/JjZLyOQ?editors=1000"
- Krijn "docent"

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

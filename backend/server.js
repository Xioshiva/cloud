const express = require('express');
const bodyParser = require('body-parser');
const jokes = require('./modules/jokes');

const PORT_NUMBER = 8080;

let app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../frontend'))

/*
* API Documentation
*/
app.get('/api', function(request, response) {
    response.setHeader('Content-Type', 'text/plain');
    response.send(`
    Voici l'API REST CRUD exposée par le backend sur /api/v1/
    
    | Verbe HTTP | Endpoint                     | Données             | Description                                    |
    |:-----------|:-----------------------------|:--------------------|:-----------------------------------------------|
    | GET        | emails/                      |                     | Retourne la liste des mails des utilisateurs   |
    | GET        | jokes/:limit                 |                     | Retourne les blagues les mieux notées          |
    | GET        | jokes/*:userEmail*/:limit    |                     | Retourne les blagues notées par l'utilisateur  |
    | POST       | jokes/                       | userEmail\*, jokeId\* | Ajout d'une nouvelle note à la blague (jokeId) |
    | DELETE     | jokes/                       | userEmail\*, jokeId\* | Suppression de la note de la blague (jokeId)   |
    | GET        | likes/*:userEmail*/*:jokeId* |                     | Retourne la note d'une blague (jokeId)         |
      `);
  });

/*
* Best jokes
* params limit the number of jokes returned
*/
app.get('/api/v1/jokes/:limit?', function(request, response) {

    console.log('Best jokes', request.params);

    const limit = request.params.limit ? request.params.limit : 10;
    response.json(jokes.getBestJokes(limit));
  });
  
/*
* Best jokes of specific users
* params userEmail* user's e-mail
* params limit the number of jokes returned
*/
app.get('/api/v1/jokes/:userEmail/:limit?', function(request, response) {

    console.log('My jokes', request.params);

    if(request.params.userEmail !== undefined) {

      response.json(jokes.getJokesFor(request.params.userEmail, request.params.limit));
    }

    response.status(400).end(); // Bad request
  });

/*
* Like a joke
* params userEmail* user's e-mail
* params jokeId* joke id to like
*/
app.post('/api/v1/jokes', function(request, response) {

    console.log('Like joke', request.body);

    if(request.body.userEmail !== undefined && request.body.jokeId !== undefined) {

      let result = jokes.saveJokeFor(request.body.jokeId, request.body.userEmail);

      if(result) {
        response.status(201).end(); // 201: Created
      }
    }

    response.status(400).end(); // 400: Bad request
  });

  
/*
* Dislike a joke
* params userEmail* user's e-mail
* params jokeId* joke id to dislike
*/
app.delete('/api/v1/jokes', function(request, response) {

    console.log('Dislike', request.body);

    if(request.body.userEmail !== undefined && request.body.jokeId !== undefined) {

      let result = jokes.deleteJokeFor(request.body.jokeId, request.body.userEmail);

      if(result) {
        response.status(202).end(); // 202: Accepted
      }
    }

    response.status(400).end(); // 400: Bad request
  });
  
/*
* Is specific joke liked or not by specific user
* params userEmail* user's e-mail
* params jokeId* joke id to retreive
*/
app.get('/api/v1/likes/:userEmail/:jokeId', function(request, response) {

    console.log('Get like', request.params);

    if(request.params.userEmail !== undefined && request.params.jokeId !== undefined) {

      let result = jokes.getJokeFor(request.params.jokeId, request.params.userEmail);

      response.status(200).json({ isLiked: result }); // 200: Ok
    }

    response.status(400).end(); // 400: Bad request
  })
  
app.listen(PORT_NUMBER);
console.log('Server started on port: ' + PORT_NUMBER);

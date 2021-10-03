import events from './events.js';
import login from './login.js';

const ICNDB_API = 'https://api.icndb.com';
const ICNDB_DEFAULT_ARGUMENT = '?exclude=[explicit]';

const JOKES_LIMIT = 10;

/*
* Manage jokes API
*/
export default {

  init: () => {
    events.listen([events.RANDOM_JOKES_BTN_CLICKED, events.LOGIN_SUCCEED], retreiveRandomJokes);
    events.listen(events.LAST_JOKES_BTN_CLICKED, retreiveLastJokes);
    events.listen(events.LIKE_JOKE_BTN_CLICKED, likeJoke);
    events.listen(events.DISLIKE_JOKE_BTN_CLICKED, dislikeJoke);
    events.listen([events.RANDOM_JOKES_SUCCEED, events.LAST_JOKES_SUCCEED], checkLike);
  },
}

function retreiveRandomJokes() {
  return fetch(ICNDB_API + '/jokes/random/' + JOKES_LIMIT + ICNDB_DEFAULT_ARGUMENT)
    .then(response => response.json())
    .then(dataJSON => {
      if (dataJSON.type === 'success') {
        events.send(events.RANDOM_JOKES_SUCCEED, dataJSON.value);
      } else {
        events.send(events.RANDOM_JOKES_FAILED, dataJSON.error);
      }
    })
}

function retreiveLastJokes() {
  return fetch(ICNDB_API + '/jokes' + ICNDB_DEFAULT_ARGUMENT)
    .then(response => response.json())
    .then(dataJSON => {
      if (dataJSON.type === 'success') {
        let lastJokes = filterLastJokes(dataJSON.value, JOKES_LIMIT);
        events.send(events.LAST_JOKES_SUCCEED, lastJokes);
      } else {
        events.send(events.LAST_JOKES_FAILED, dataJSON.error);
      }
    })
}

function filterLastJokes(jokes, nbr) {
  return jokes.slice(Math.max(jokes.length - nbr, 1));
}

function likeJoke(data) {
  if (login.isUserConnected()) {
    data.userEmail = login.getConnectedUserEmail();
    const config = getConfigJSON(data, 'POST');

    return fetch('//localhost:8080/api/v1/jokes', config)
      .then(function(response) {
        if(response.status === 201) {
          events.send(events.LIKE_JOKE_SUCCEED, data);
        } else {
          events.send(events.LIKE_JOKE_FAILED, response.error);
        }
      });
  }
  events.send(LIKE_JOKE_FAILED, 'User not connected');
}

function dislikeJoke(data) {
  if (login.isUserConnected()) {
    data.userEmail = login.getConnectedUserEmail();
    const config = getConfigJSON(data, 'DELETE');

    return fetch('//localhost:8080/api/v1/jokes', config)
      .then(function(response) {
        if (response.status === 202) {
          events.send(events.DISLIKE_JOKE_SUCCEED, data);
        } else {
          events.send(events.DISLIKE_JOKE_FAILED, response.error);
        }
      });
  }
  events.send(DISLIKE_JOKE_FAILED, 'User not connected');
}

function checkLike(data) {
  if (login.isUserConnected()) {
    const userEmail = login.getConnectedUserEmail();
    data.forEach(joke => {
      return fetch('//localhost:8080/api/v1/likes/' + userEmail + '/' + joke.id)
        .then(response => response.json())
        .then(result => {
          if(result.isLiked) {
            events.send(events.RETREIVE_LIKE_SUCCEED, { jokeId: joke.id});
          }
        });
    });
  }
}

function getConfigJSON(data, method = 'GET') {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
}

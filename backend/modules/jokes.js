let persist = require('./persist');

exports.getBestJokes = function(limit = 20) {
  return persist.getIdsOrderByOccurence().slice(0, limit);
}

exports.getJokesFor = function(email, limit = 20) {
  return persist.getIdsForUser(email).slice(0, limit);
}

exports.getJokeFor = function(jokeId, email) {
  return persist.isIdExistsForUser(jokeId, email);
}

exports.saveJokeFor = function(jokeId, email) {
  return persist.addIdToUser(jokeId, email);
}

exports.deleteJokeFor = function(jokeId, email) {
  return persist.removeIdToUser(jokeId, email);
}

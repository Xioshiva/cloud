let database = {
  'dev@hesge.ch': [
    1,2,3
  ],
  'test@hesge.ch': [
    2,4,6
  ]
}

exports.isIdExistsForUser = function(id, email) {
  createArrayWhenInexistant(email);

  return isIdExists(id, email);
}

exports.addIdToUser = function(id, email) {
  createArrayWhenInexistant(email);

  if(!isIdExists(id, email)) {
    database[email].push(id);
    return true;
  }
  return false;
}

exports.removeIdToUser = function(id, email) {
  createArrayWhenInexistant(email);

  if(isIdExists(id, email)) {
    const index = database[email].indexOf(parseInt(id))
    database[email].splice(index, 1);
    return true;
  }
  return false;
}

exports.getIdsForUser = function(email) {
  createArrayWhenInexistant(email);

  return database[email].sort();
}

exports.getIdsOrderByOccurence = function(email) {
  createArrayWhenInexistant(email);

  var ids = Object.values(database)
    .flat()
    .reduce((acc, curr) => {
      acc[curr] ? acc[curr]++ : acc[curr] = 1
      return acc
    }, {});

  return Object.keys(ids)
    .sort()
    .map(key => ids[key]);
}

function createArrayWhenInexistant(email) {
  if(!Array.isArray(database[email])) {
    database[email] = [];
  }
}

function isIdExists(id, email) {
  return database[email].indexOf(parseInt(id)) !== -1;
}

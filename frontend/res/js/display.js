import events from './events.js';
import login from './login.js';

/*
* Manage changing on display
*/
export default {

  init: () => {
    // Random jokes
    events.listen(events.RANDOM_JOKES_BTN_CLICKED, () => displayTitle('Blagues aléatoires'));
    events.listen(events.RANDOM_JOKES_SUCCEED, displayJokes);
    // Last jokes
    events.listen(events.LAST_JOKES_BTN_CLICKED, () => displayTitle('Dernières blagues'));
    events.listen(events.LAST_JOKES_SUCCEED, displayJokes);
    // Login & logout
    events.listen(events.LOGIN_SUCCEED, displayUserConnected);
    events.listen(events.LOGIN_FAILED, displayUserLoginError);
    events.listen(events.LOGOUT_SUCCEED, displayUserDisconnected);
    // Like & dislike
    events.listen([events.DISLIKE_JOKE_SUCCEED, events.LIKE_JOKE_FAILED], activeLikeBtn);
    events.listen([
      events.LIKE_JOKE_SUCCEED,
      events.DISLIKE_JOKE_FAILED,
      events.RETREIVE_LIKE_SUCCEED
    ], activeDislikeBtn);
  }
}

function displayUserConnected(data) {
  document.getElementById('console-error').style.display = 'none';
  document.getElementById('user-disconnected').style.display = 'none';
  document.getElementById('user-connected').style.display = 'flex';
  
  document.getElementById('welcome-user').innerHTML = 'Connecté: ' + data.userEmail;
  
  changeDisabledPropertyForAllLikeBtn(false);
}

function displayUserLoginError(data) {
  const consoleError = document.getElementById('console-error');
  consoleError.style.display = 'block';
  consoleError.innerHTML = 'L\'adresse e-mail n\'est pas valide';
}

function displayUserDisconnected() {
  document.getElementById('user-connected').style.display = 'none';
  document.getElementById('user-disconnected').style.display = 'flex';
  
  changeDisabledPropertyForAllLikeBtn(true);
}

function changeDisabledPropertyForAllLikeBtn(disabled) {
  let likeBtnElementArray = document.getElementsByClassName('like-btn');
  for (let likeBtnElement of likeBtnElementArray) {
    likeBtnElement.disabled = disabled;
  }
}

function displayTitle(title) {
  document.getElementById('jokes').innerHTML = '<p>Chargement... </p>';
  document.getElementById('main-title').innerHTML = title;
}

function displayJokes(jokeArray) {
  emptyJokeContainer();

  for (let joke of jokeArray) {
    displayJoke(joke);
  }
}

function emptyJokeContainer() {
  document.getElementById('jokes').innerHTML = '';
}

function displayJoke(data) {
  let element = createJokeElement(data.id, data.joke);
  element.title = data.joke;
  document.getElementById('jokes').appendChild(element);
}

function createJokeElement(jokeId, text) {
  let jokeElement = document.createElement('div');
  jokeElement.className = 'joke';
  jokeElement.setAttribute('id', 'joke-id-' + jokeId);
  jokeElement.appendChild(createParagraph(text));
  jokeElement.appendChild(createLikeBtn(jokeId));
  return jokeElement;
}

function createParagraph(jokeText) {
  let paragraphElement = document.createElement('p');
  paragraphElement.innerHTML = jokeText;
  return paragraphElement;
}

function createLikeBtn(jokeId, liked) {
  let likeBtnElement = document.createElement('button');
  likeBtnElement.className = 'like-btn';
  likeBtnElement.innerHTML = liked ? 'Dislike' : 'Like';
  likeBtnElement.disabled = !login.isUserConnected();
  likeBtnElement.onclick = () => sendeventsAndToggleButton(likeBtnElement, jokeId);
  return likeBtnElement;
}

function sendeventsAndToggleButton(likeBtnElement, jokeId) {
  if (likeBtnElement.innerHTML === 'Like') {
    events.send(events.LIKE_JOKE_BTN_CLICKED, { jokeId });
  } else {
    events.send(events.DISLIKE_JOKE_BTN_CLICKED, { jokeId });
  }
  likeBtnElement.disabled = !login.isUserConnected();
}

function activeLikeBtn(data) {
  const jokeElement = document.getElementById('joke-id-' + data.jokeId);
  if (jokeElement) {
    const likeBtnElement = jokeElement.getElementsByClassName('like-btn')[0];
    likeBtnElement.innerHTML = 'Like';
    likeBtnElement.disabled = false;
  }
}

function activeDislikeBtn(data) {
  const jokeElement = document.getElementById('joke-id-' + data.jokeId);
  if (jokeElement) {
    const dislikeBtnElement = jokeElement.getElementsByClassName('like-btn')[0];
    dislikeBtnElement.innerHTML = 'Dislike';
    dislikeBtnElement.disabled = false;
  }
}

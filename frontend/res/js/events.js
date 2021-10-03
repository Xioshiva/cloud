/*
* Manage events listening and subscribing
*/
export default {
  // Login
  LOGIN_BTN_CLICKED: 'User clicked on login button',
  LOGIN_SUCCEED: 'User login succeed',
  LOGIN_FAILED: 'User login failed',
  // Logout
  LOGOUT_BTN_CLICKED: 'User clicked on logout button',
  LOGOUT_SUCCEED: 'User logout succeed',
  // My jokes
  MY_JOKES_BTN_CLICKED: 'User clicked on my-jokes button',
  // Random jokes
  RANDOM_JOKES_BTN_CLICKED: 'User clicked on random-jokes button',
  RANDOM_JOKES_SUCCEED: 'Random jokes retreiving from API succeed',
  RANDOM_JOKES_FAILED: 'Random jokes retreiving from API failed',
  // Best jokes
  BEST_JOKES_BTN_CLICKED: 'User clicked on best-jokes button',
  // Last jokes
  LAST_JOKES_BTN_CLICKED: 'User clicked on last-jokes button',
  LAST_JOKES_SUCCEED: 'Last jokes retreiving from API succeed',
  LAST_JOKES_FAILED: 'Last jokes retreiving from API failed',
  // Like joke
  LIKE_JOKE_BTN_CLICKED: 'User clicked on like joke button',
  LIKE_JOKE_SUCCEED: 'Like joke sending to API succeed',
  LIKE_JOKE_FAILED: 'Like joke sending to API failed',
  // Dislike joke
  DISLIKE_JOKE_BTN_CLICKED: 'User clicked on dislike joke button',
  DISLIKE_JOKE_SUCCEED: 'Dislike joke sending to API succeed',
  DISLIKE_JOKE_FAILED: 'Dislike joke sending to API failed',
  RETREIVE_LIKE_SUCCEED: 'Retreive like for joke id',
  
  send: (action, data = null) => {
    const event = new CustomEvent(action, { detail: data });
    document.body.dispatchEvent(event);
    if (data) {
      console.log(action, data);
    } else {
      console.log(action);
    }
  },
  
  listen: (actionOractionArray, callback) => {
    if (Array.isArray(actionOractionArray)) {
      for (const action of actionOractionArray) {
        listen(action, callback);
      }
    } else {
      listen(actionOractionArray, callback);
    }
  }
}

function listen(action, callback) {
  document.body.addEventListener(action, e => callback(e.detail));
}

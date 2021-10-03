import events from './events.js';

let userEmail;

/*
* Manage login and logout user only in local
*/
export default {
  
  init: () => {
    events.listen(events.LOGIN_BTN_CLICKED, login);
    events.listen(events.LOGOUT_BTN_CLICKED, logout);
  },

  isUserConnected: () => userEmail !== undefined,

  getConnectedUserEmail: () => userEmail,
}

function login(data) {
  console.log('Connecting...');

  if (validateEmail(data.userEmail)) {
    userEmail = data.userEmail;
    events.send(events.LOGIN_SUCCEED, data);
  } else {
    events.send(events.LOGIN_FAILED);
  }
  
}

function logout() {
  console.log('Disconnecting...');
  userEmail = undefined;
  events.send(events.LOGOUT_SUCCEED);
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

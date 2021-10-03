import display from './display.js';
import events from './events.js';
import jokes from './jokes.js';
import login from './login.js';

// Initialization
display.init();
jokes.init();
login.init();

// Intialize input events from user
document.getElementById('login-btn').onclick = () => {
  const userEmailElement = document.getElementById('user-email');
  events.send(events.LOGIN_BTN_CLICKED, { userEmail: userEmailElement.value })
}
document.getElementById('logout-btn').onclick = () => events.send(events.LOGOUT_BTN_CLICKED);

document.getElementById('my-jokes').onclick = () => events.send(events.MY_JOKES_BTN_CLICKED);
document.getElementById('random-jokes').onclick = () => events.send(events.RANDOM_JOKES_BTN_CLICKED);
document.getElementById('best-jokes').onclick = () => events.send(events.BEST_JOKES_BTN_CLICKED);
document.getElementById('last-jokes').onclick = () => events.send(events.LAST_JOKES_BTN_CLICKED);

// Display random jokes by default
events.send(events.RANDOM_JOKES_BTN_CLICKED);

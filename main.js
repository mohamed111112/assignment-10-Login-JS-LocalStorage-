// Get DOM elements
const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');
const logoutBtn = document.getElementById('logoutBtn');

const emailLogin = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');

const nameSignUp = document.getElementById('nameSignUp');
const emailSignUp = document.getElementById('emailSignUp');
const passwordSignUp = document.getElementById('passwordSignUp');

const signUp = document.getElementById('signUp');
const login = document.getElementById('login');

const signUpMsg = document.getElementById('signUpMsg');
const loginMsg = document.getElementById('loginMsg');

const signUpCard = document.getElementById('signUpCard');
const loginCard = document.getElementById('loginCard');
const home = document.getElementById('home');

// Event listeners
login.addEventListener('click', showSignUp);
signUp.addEventListener('click', showLogin);
signUpBtn.addEventListener('click', signUpAcc);
loginBtn.addEventListener('click', loginAcc);
logoutBtn.addEventListener('click', logout);


// Functions

// Show sign up form
function showSignUp() {
  // Hide login card and show sign up card
  loginCard.classList.add("d-none");
  loginCard.classList.remove("d-flex");
  signUpCard.classList.add("d-flex");
  signUpCard.classList.remove("d-none");
  home.classList.add("d-none");
  home.classList.remove("d-flex");
  // Clear login message
  loginMsg.innerHTML = '';
}

// Show login form
function showLogin() {
  // Hide sign up card and show login card
  loginCard.classList.add("d-flex");
  loginCard.classList.remove("d-none");
  signUpCard.classList.add("d-none");
  signUpCard.classList.remove("d-flex");
  home.classList.add("d-none");
  home.classList.remove("d-flex");
  // Clear sign up message
  signUpMsg.innerHTML = '';
}

// Show home page with welcome message
function showHome(username) {
  // Display welcome message
  welcomeName.innerHTML = 'Welcome ' + username;
  // Hide login and sign up cards
  loginCard.classList.add("d-none");
  loginCard.classList.remove("d-flex");
  signUpCard.classList.add("d-none");
  // Show home page
  home.classList.remove("d-none");
  home.classList.add("d-flex");
}

// Initialize emails array from localStorage
let emailsArr = JSON.parse(localStorage.getItem('data')) || [];

// Check if user is already logged in
const isLoggedIn = localStorage.getItem('loggedInUser');
if (isLoggedIn) {
  const username = JSON.parse(isLoggedIn).username;
  showHome(username);
}

// Sign up function
function signUpAcc() {
  // Validate sign up inputs
  if (signUpCheck()) {
    // Display success message
    signUpMsg.innerHTML = `<div class="message-container"><span style="color: rgb(40, 167, 69);">Success</span></div>`;
    // Create account object
    const account = {
      aName: nameSignUp.value,
      aEmail: emailSignUp.value,
      aPass: passwordSignUp.value
    };
    // Push account to emails array and store in localStorage
    emailsArr.push(account);
    localStorage.setItem('data', JSON.stringify(emailsArr));
  }
}

// Login function
function loginAcc() {
  // Validate login inputs
  if (loginCheck()) {
    const username = loginCheck();
    // Show home page with username
    showHome(username);
    // Store logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify({ username: username }));
  }
}

// Logout function
function logout() {
  // Remove logged-in user from localStorage
  localStorage.removeItem('loggedInUser');
  // Show login form
  showLogin();
}

// Sign up form validation
function signUpCheck() {
  let checkResult = true;

  // Check if all sign up inputs are filled
  if (nameSignUp.value === '' || emailSignUp.value === '' || passwordSignUp.value === '') {
    checkResult = false;
    signUpMsg.innerHTML = `<div class="message-container"><span style="color: #DC3541;">All inputs are required</span></div>`;
  }

  // Check if email already exists
  for (let i = 0; i < emailsArr.length; i++) {
    if (emailSignUp.value === emailsArr[i].aEmail) {
      checkResult = false;
      signUpMsg.innerHTML = `<div class="message-container"><span style="color: #DC3541;">Email already exists</span></div>`;
      break;
    }
  }

  return checkResult;
}

// Login form validation
function loginCheck() {
  // Check if email and password inputs are filled
  if (emailLogin.value === '' || passwordLogin.value === '') {
    loginMsg.innerHTML = `<div class="message-container"><span style="color: #DC3541;">All inputs are required</span></div>`;
    return false;
  }

  // Check if email and password match stored data
  for (let i = 0; i < emailsArr.length; i++) {
    if (emailLogin.value === emailsArr[i].aEmail && passwordLogin.value === emailsArr[i].aPass) {
      return emailsArr[i].aName;
    }
  }

  // Display error message for incorrect credentials
  loginMsg.innerHTML = `<div class="message-container"><span style="color: #DC3541;">Incorrect email or password</span></div>`;
  return false;
}

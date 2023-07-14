import { authenticateUser, getToken, getUserName, handleSignIn, storeTokenAndUserName } from "../LOGIN FOLDER/login.js";

console.log(authenticateUser);
// Check if the user is authenticated
async function checkAuthentication() {
  const token = getToken();
  const userName = getUserName();

  if (token && userName) {
    // User is already authenticated, redirect to the main page
    window.location.href = '/MAINTWO FOLDER/Sidebar Menu - Dark Light Mode/index.html';
  } else {
    // Get email and password from input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Authenticate user
      const { token, userName } = await authenticateUser(email, password);

      // Store token and userName in localStorage
      storeTokenAndUserName(token, userName);

      // User is authenticated, redirect to the main page
      window.location.href = '/MAINTWO FOLDER/Sidebar Menu - Dark Light Mode/index.html';
    } catch (error) {
      // User authentication failed, redirect to the login page with an error message
      const errorParam = new URLSearchParams({ error: 'true' }).toString();
      window.location.href = `../LOGIN FOLDER/login.html?${errorParam}`;
    }
  }
}

// Call the function to check authentication
checkAuthentication();

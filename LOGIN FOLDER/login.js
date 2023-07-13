/////function to hide or show the password input
let eyeIcons = document.querySelectorAll(".eyeSlack");
eyeIcons.forEach(function (eyeIcon) {
  eyeIcon.addEventListener("click", function () {
    // Get the associated password input element
    let passwordInput = this.parentElement.querySelector(
      'input[type="password"]'
    );
    // Toggle the type attribute of the associated password input element
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setTimeout(function () {
        passwordInput.type = "password";
      }, 1000); // Revert back to 'password' after 1 second (1000 milliseconds)
    } else {
      passwordInput.type = "password";
    }
  });
});

// Function to store the token in local storage
function storeToken(token) {
  localStorage.setItem('token', token);
}

// Function to retrieve the token from local storage
function getToken() {
  return localStorage.getItem('token');
}

// Function to handle form submission for signing in
async function handleSignIn(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailBox');
  const passwordInput = document.getElementById('passwordBox');
  const submitButton = document.getElementById('submit');
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  try {
    const token = await authenticateUser(email, password);
  
    if (token) {
      storeToken(token);
      // Navigate to the next page
      alert("congratulation")
      window.location.href = '/MAIN FOLDER/main.html';
    } else {
      alert('Invalid email or password');
    }
  } catch (error) {
    alert('You need to SignUp first: ' + error.message);
  }
}

// Function to authenticate the user and retrieve the token
async function authenticateUser(email, password) {
  try {
    // Make API call to authenticate the user
    const response = await fetch('https://techmeetappwebapi.onrender.com/api/Account/login',{
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      let errorMessage = 'Failed to authenticate user';

      if (response.status === 404) {
        errorMessage = 'API endpoint not found';
      } else if (response.status === 401) {
        errorMessage = 'Unauthorized access';
      } else if (response.status === 500) {
        errorMessage = 'Internal server error';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Return the authentication token
    return data.token;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Attach event listener to form submit event for signing in
const signInForm = document.getElementById('validationForm');
signInForm.addEventListener('submit', handleSignIn);
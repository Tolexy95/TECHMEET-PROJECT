// Function to hide or show the password input
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

// Function to handle form submission for signing up
async function handleSignUp(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("usernameBox");
  const fullNameInput = document.getElementById("fullNameBox");
  const genderInput = document.getElementById("genderBox");
  const dobInput = document.getElementById("DobBox");
  const cityInput = document.getElementById("cityBox");
  const countryInput = document.getElementById("CountryBox");
  const ninInput = document.getElementById("NinBox");
  const emailInput = document.getElementById("emailSignUpBox");
  const passwordInput = document.getElementById("passwordSignUpBox");
  const confirmPasswordInput = document.getElementById("confirmPasswordBox");
  const signUpButton = document.getElementById("signUpBtn");

  const userName = usernameInput.value;
  const fullName = fullNameInput.value;
  const gender = genderInput.value;
  const dateOfBirth = dobInput.value;
  const city = cityInput.value;
  const country = countryInput.value;
  const nin = ninInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  // const confirmPassword = confirmPasswordInput.value;

  try {
    const isSuccess = await signUpUser(
      userName,
      fullName,
      gender,
      dateOfBirth,
      city,
      country,
      nin,
      email,
      password,
      // confirmPassword
    );

    if (isSuccess) {
      alert("Sign up successful");
      window.location.href = "../LOGIN FOLDER/login.html"; // Redirect to the login page
    } else {
      console.log("Failed to sign up user");
    }
  } catch (error) {
    console.log("Error occurred during sign-up: " + error.message);
  }
}

// Function to sign up the user
async function signUpUser(
  userName,
  fullName,
  gender,
  dateOfBirth,
  city,
  country,
  nin,
  email,
  password,
  // confirmPassword
) {
  try {
    // Make API call to sign up the user
    const response = await fetch(
      "https://techmeetappwebapi.onrender.com/api/Account/register",
      {
        method: "POST",
        body: JSON.stringify({
          userName,
          fullName,
          gender,
          dateOfBirth,
          city,
          country,
          nin,
          email,
          password,
          // confirmPassword,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    let errorMessage;

    if (response.status === 200) {
      // Handle Success Status
      return true;
    } else {
      if (response.status === 404) {
        errorMessage = "API endpoint not found";
      } else if (response.status === 409) {
        errorMessage = "Username or email already exists";
      } else if (response.status === 500) {
        errorMessage = "Internal server error";
      }

      throw new Error(errorMessage);
    }

    // Return the sign-up result
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Attach event listener to form submit event for signing up
const signUpForm = document.getElementById("validateSignUp");
signUpForm.addEventListener("submit", handleSignUp);




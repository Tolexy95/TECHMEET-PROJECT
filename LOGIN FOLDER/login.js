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
const loaderElement = document.querySelector(".loader");
const messageContainer=document.querySelector(".messageContainer")
// Function to store the token and user's name in local storage
export function storeTokenAndUserName(token, userName) {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);
}


// Function to retrieve the token from local storage
export function getToken() {
  return localStorage.getItem('token');
}

// Function to retrieve the user's name from local storage
export function getUserName() {
  return localStorage.getItem('userName');
}

// Function to handle form submission for signing in
export async function handleSignIn(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailBox');
  const passwordInput = document.getElementById('passwordBox');
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  loaderElement.style.opacity ="1";
  try {
    const { token, userName } = await authenticateUser(email, password);
    
    if (token && userName) {
      storeTokenAndUserName(token, userName);
      
     
      messageContainer.textContent=`You are logged in as ${userName}`

      window.location.href = '/MAINTWO FOLDER/Sidebar Menu - Dark Light Mode/index.html';
    } else {
      alert('Invalid email or password');
    }
  } catch (error) {
    alert('You need to SignUp first: ' + error.message);
  }
}

// Function to authenticate the user and retrieve the token and user's name
export async function authenticateUser(email, password) {
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

    // Return the authentication token and user's name
    return {
      token: data.token,
      userName: data.userName
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Attach event listener to form submit event for signing in
const signInForm = document.getElementById('validationForm');
signInForm.addEventListener('submit', handleSignIn);

// const signInButton = document.getElementById("submit");

// console.log(signInButton)
// // Function to handle form submission for signing in
// function loaderPage(event) {
//   event.preventDefault();

//   const emailInput = document.getElementById('emailBox');
//   const passwordInput = document.getElementById('passwordBox');

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   if (email.trim() === '' || password.trim() === '') {
//     // Display an error message or perform any desired action
//     alert('Please enter both email and password.');
//   } else {
//     // Navigate to the loader page
//     window.location.href = '../LOADER PAGE/loader.html';
//   }
// }

// signInButton.addEventListener("click", loaderPage);














// // const signInForm = document.getElementById("validationForm");
// //   const submitButton = document.getElementById('submit');
// // submitButton.addEventListener("click", () => {
// //   const loader = document.querySelector(".loader");
// //   loader.style.display ="block";
// //   signInForm.style.display ="none";
// // })









async function getUsers() {
  try {
    const response = await fetch("https://techmeetappapi.azurewebsites.net/api/Users");
   
    const data = await response.json();
    const userSection = document.getElementById("userSection");

    const currentUser = localStorage.getItem("userName"); // Retrieve the userName from local storage

    data.forEach((user) => {
      if (user.name === currentUser) { // Check if the user name matches the current user
        const userContainer = document.createElement("div");
        userContainer.classList.add("memberContainer");

        const userImage = document.createElement("img");
        userImage.src = user.image;
        userImage.alt = "User Image";
        userImage.classList.add("otherUserImage");
        userContainer.appendChild(userImage);

        const userName = document.createElement("p");
        userName.textContent = user.name;
        userName.classList.add("otherUserName");
        userContainer.appendChild(userName);

        const userEmail = document.createElement("p");
        userEmail.textContent = user.email;
        userEmail.classList.add("otherUserEmail");
        userContainer.appendChild(userEmail);

        const userProfileLink = document.createElement("a");
        userProfileLink.href = `/MAIN FOLDER/main.html?username=${encodeURIComponent(user.name)}`;
        userProfileLink.textContent = "Go to user profile";
        userProfileLink.classList.add("otherUserProfile");
        userContainer.appendChild(userProfileLink);

        const chatLink = document.createElement("a");
        chatLink.href = `/MESSAGE/message.html?username=${encodeURIComponent(currentUser)}&recipient=${encodeURIComponent(user.name)}`; // Pass both the current user and the recipient's name as query parameters
        chatLink.textContent = "Chat with user";
        chatLink.classList.add("chatWithUser");
        userContainer.appendChild(chatLink);

        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.placeholder = "Type your message";
        messageInput.classList.add("messageInput");
        userContainer.appendChild(messageInput);

        const sendMessageButton = document.createElement("button");
        sendMessageButton.textContent = "Send";
        sendMessageButton.classList.add("sendMessageButton");
        sendMessageButton.addEventListener("click", () => {
          const message = messageInput.value;
          if (message.trim() !== "") {
            // Perform the logic to send the message to the recipient
            console.log(`Sending message: "${message}" to recipient: ${user.name}`);
            messageInput.value = "";
          }
        });
        userContainer.appendChild(sendMessageButton);

        userSection.appendChild(userContainer);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getUsers();







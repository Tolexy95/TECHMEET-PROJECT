const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});



// Function to retrieve the user credentials from local storage
function getUserCredentials() {
    return localStorage.getItem("userName");
  }
  
  // Function to load the user credentials on the navigation bar
  function loadUserCredentials() {
    // Retrieve the user credentials from local storage
    const userName = getUserCredentials();
  
    // Get the user credentials element
    const userCredentials = document.getElementById("userCredentials");
  
    // Update the user credentials element with the welcome message
    if (userName) {
      userCredentials.textContent = `Welcome ${userName}`;
    }
  }
  
  // Call the loadUserCredentials function when the page loads
  window.addEventListener("load", loadUserCredentials);
  
 
 
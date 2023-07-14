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
  
  // Function to handle user search
  async function handleUserSearch(event) {
    if (event.key === "Enter") {
      const searchInput = document.querySelector('.search-box input');
      const username = searchInput.value.trim();
  
      if (username !== '') {
        try {
          const userProfileEndpoint = `https://techmeetappwebapi.onrender.com/api/Users/${username}`;
  
          // Make API call to check if the user profile exists
          const response = await fetch(userProfileEndpoint);
  
          if (response.ok) {
            // User profile exists, redirect to the profile page
            window.location.href = `/PROFILE FOLDER/profile.html?username=${username}`;
          } else {
            // User profile does not exist, display an error message or handle accordingly
            alert('User profile not found');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }
  
  // Add event listener to the search input for keyup event
  const searchInput = document.querySelector('.search-box input');
  searchInput.addEventListener('keyup', handleUserSearch);
  

  // Alternatively, you can listen to form submission event
  // const searchForm = document.querySelector('.search-box');
  // searchForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   handleUserSearch();
  // });
  
 
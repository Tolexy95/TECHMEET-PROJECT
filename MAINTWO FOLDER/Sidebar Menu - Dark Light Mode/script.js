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
  
  async function handleUserSearch(event) {
    if (event.key === "Enter") {
      const searchInput = document.querySelector('.search-box input');
      const username = searchInput.value.trim();
  
      if (username !== '') {
        try {
          // Retrieve the actual username from the user login API
          const token = localStorage.getItem('token');
          const response = await fetch('https://techmeetappwebapi.onrender.com/api/Account/user', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });
  
          if (response.ok) {
            const user = await response.json();
            const actualUsername = user.userName;
  
            const userProfileEndpoint = `https://techmeetappwebapi.onrender.com/api/Users/${actualUsername}`;
  
            // Make API call to upload the user profile
            const uploadProfileResponse = await fetch(userProfileEndpoint, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({ username })
            });
  
            if (uploadProfileResponse.ok) {
              // User profile uploaded successfully, redirect to the profile page
              window.location.href = `/PROFILE FOLDER/profile.html?username=${actualUsername}`;
            } else {
              // Failed to upload user profile, display an error message or handle accordingly
              alert('Failed to upload user profile');
            }
          } else {
            // Handle unauthorized access or other errors
            alert('Unauthorized access or error occurred');
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
  
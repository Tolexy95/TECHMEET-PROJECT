// Get the file input element and profile picture preview element
const fileInput = document.getElementById('profile-picture');
const picturePreview = document.querySelector('.profile-picture-preview');

// Listen for changes in the file input
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
function previewProfilePicture(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const preview = document.querySelector('.profile-picture-preview');
    preview.src = reader.result;
  }

  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }
}

// const profileIcon = document.querySelector(".profileIcon");
// const profileContainer = document.querySelector(".container");

// // Variable to track the toggle state
// let isProfileContainerVisible = false;

// // Function to toggle the profile container
// function toggleProfileContainer() {
//   if (isProfileContainerVisible) {
//     profileContainer.style.display = "none";
//   } else {
//     profileContainer.style.display = "block";
//     // Center the profile container vertically
//     // profileContainer.style.transform = "translateX(0%)";
//   }

//   // Toggle the state
//   isProfileContainerVisible = !isProfileContainerVisible;
// }
// // Add click event listener to the profile icon
// profileIcon.addEventListener("click", toggleProfileContainer);


// Get the "Other User Profile" link element
const otherUserProfileLink = document.querySelectorAll('.otherUserProfile');

otherUserProfileLink.forEach((userProfile => {
  userProfile.addEventListener("click", (e) => {
    e.preventDefault();
    // Show the profile container
    profileContainer.style.display = 'block';
    // profileContainer.style.zIndex = '10';

    profileContainer.addEventListener('mouseleave', () => {
      // Hide the profile container
      profileContainer.style.display = 'none';
    });
    
  }); 

}));


// Function to save the profile information
function saveProfile() {
  // Get all the input values
  const profilePicture= document.getElementById("profile-picture-preview").src;
  const firstName = document.getElementById("first-name").value;
  const yearsOfExperience = document.getElementById("yearsOfExperience").value;
  const lastName = document.getElementById("last-name").value;
  const phoneNumber = document.getElementById("phone").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const stack = document.getElementById("stack").value;
  const facebook = document.getElementById("facebook").value;
  const linkedin = document.getElementById("linkedin").value;
  const twitter = document.getElementById("twitter").value;
  const instagram = document.getElementById("instagram").value;
  const bio = document.getElementById("bio").value;

  // Create a profile object
  const profile = {
    profilePicture,
    firstName,
    lastName,
    phoneNumber,
    gender,
    email,
    address,
    stack,
    yearsOfExperience,
    social: {
      facebook,
      linkedin,
      twitter,
      instagram
    },
    bio
  };

  // Save the profile object to localStorage
  localStorage.setItem("profile", JSON.stringify(profile));
}

// Function to load the profile information
function loadProfile() {
  // Check if profile data exists in localStorage
  if (localStorage.getItem("profile")) {
    // Retrieve the profile object from localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));

    // Set the input values from the profile object
    document.getElementById("profile-picture-preview").src = profile.profilePicture;
    document.getElementById("first-name").value = profile.firstName;
    document.getElementById("last-name").value = profile.lastName;
    document.getElementById("phone").value = profile.phoneNumber;
    document.getElementById("gender").value = profile.gender;
    document.getElementById("email").value = profile.email;
    document.getElementById("address").value = profile.address;
    document.getElementById("stack").value = profile.stack;
    document.getElementById("yearsOfExperience").value = profile.yearsOfExperience;
    document.getElementById("facebook").value = profile.social.facebook;
    document.getElementById("linkedin").value = profile.social.linkedin;
    document.getElementById("twitter").value = profile.social.twitter;
    document.getElementById("instagram").value = profile.social.instagram;
    document.getElementById("bio").value = profile.bio;
  }
}

// Add event listener to the "Update Profile" button
const updateBtn = document.querySelector(".update-btn");
updateBtn.addEventListener("click", saveProfile);

// Call the loadProfile function when the page loads
window.addEventListener("load", loadProfile);


// Function to toggle between light and dark mode
function toggleDarkMode() {
  const body = document.body;
  const profileContainer = document.querySelector(".container");
  body.classList.toggle('dark-mode');
  profileContainer.classList.toggle("dark-mode");
}

// Add event listener to toggle switch
const toggleSwitch = document.getElementById('toggleSwitch');
toggleSwitch.addEventListener('change', toggleDarkMode);






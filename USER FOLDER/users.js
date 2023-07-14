async function getUsers() {
  try {
    const response = await fetch("https://techmeetappapi.azurewebsites.net/api/Users");
    
    const data = await response.json();
    const userSection = document.getElementById("userSection");

    const currentUser = localStorage.getItem("userName"); // Retrieve the userName from local storage

    data.forEach((user) => {
      const userContainer = document.createElement("div");
      userContainer.classList.add("memberContainer");

      const userImage = document.createElement("img");
      userImage.src = user.photoUrl;
      userImage.alt = "User Image";
      userImage.classList.add("otherUserImage");
      userContainer.appendChild(userImage);

      const userName = document.createElement("p");
      userName.textContent = user.userName;
      userName.classList.add("otherUserName");
      userContainer.appendChild(userName);

      const userEmail = document.createElement("p");
      userEmail.textContent = user.email;
      userEmail.classList.add("otherUserEmail");
      userContainer.appendChild(userEmail);

      const lastActive = document.createElement("p");
      const lastActiveDateTime = new Date(user.lastActive);
      const formattedDate = lastActiveDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      const formattedTime = lastActiveDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      lastActive.textContent = `Last Active: ${formattedDate} by ${formattedTime}`;
      lastActive.classList.add("lastActive");
      userContainer.appendChild(lastActive);

      const userProfileLink = document.createElement("a");
      userProfileLink.href = `/users/${user.currentUser}`;
      userProfileLink.textContent = "Go to user profile";
      userProfileLink.classList.add("otherUserProfile");
      userContainer.appendChild(userProfileLink);

      const chatLink = document.createElement("a");
      chatLink.href = `/chatBox Folder/chat.html${user.currentUser}`;
      chatLink.textContent = "Chat with user";
      chatLink.classList.add("chatWithUser");
      userContainer.appendChild(chatLink);

      userSection.appendChild(userContainer);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getUsers();

async function getUsers() {
  try {
    const response = await fetch("https://techmeetappapi.azurewebsites.net/api/Users");
    const data = await response.json();
    const userSection = document.getElementById("userSection");

    data.forEach((user) => {
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
      userProfileLink.href = `/users/${user.id}`;
      userProfileLink.textContent = "Go to user profile";
      userProfileLink.classList.add("otherUserProfile");
      userContainer.appendChild(userProfileLink);

      const chatLink = document.createElement("a");
    //   chatLink.href = `/MESSAGE/message.html${user.id}`;
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




// Function to handle chat div click
function handleChatClick() {
  // Retrieve the chat history between the user and the people
  // ...
  
  // Navigate to the chatbox HTML with the chat history
  window.location.href = '../chatBox Folder/chat.html';
}

// Get all the chat div elements
const chatDivs = document.querySelectorAll('.preview-item');

// Attach click event listener to each chat div
chatDivs.forEach(chatDiv => {
  chatDiv.addEventListener('click', handleChatClick);
});

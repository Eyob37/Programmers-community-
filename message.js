import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  push,
  onValue,
  update,
  onDisconnect,
  set,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxMSbx5OoHAav-st3h8DbCUZ9aZCcHnI8",
  authDomain: "programming-community-80d94.firebaseapp.com",
  projectId: "programming-community-80d94",
  storageBucket: "programming-community-80d94.firebasestorage.app",
  messagingSenderId: "103513211773",
  appId: "1:103513211773:web:cb90e77287f005b7870214",
  measurementId: "G-MMZD11XDNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

let messagesRef; // Declare globally
let chatId;
const userId = sessionStorage.getItem("thisId");
const currentUserId = localStorage.getItem("userId");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");


  // Generate unique chat room ID
  chatId = [currentUserId, userId].sort().join("_");
  messagesRef = ref(db, `PCChat/chats/${chatId}/messages`);
  const metadataRef = ref(db, `PCChat/chats/${chatId}/metadata`);  

  // Listen for new messages
  onChildAdded(messagesRef, (snapshot) => {

  const message = snapshot.val();
  const messageKey = snapshot.key;

  displayMessage(message);

  // Mark as seen if it's from the other user
  if (message.sender !== currentUserId) {
    update(ref(db, `PCChat/chats/${chatId}/messages/${messageKey}`), {
      seen: true
    });
  }
});

  // Send message
  sendButton.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (text) {
      const timestamp = Date.now();
      const message = {
        sender: currentUserId,
        receiver: userId,
        text,
        timestamp,
        seen: false,
        type: "text"
      };

      push(messagesRef, message);
      set(metadataRef, {
        lastMessage: text,
        lastTimestamp: timestamp
      });      

      messageInput.value = "";
    }
  });


function displayMessage(msg) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const isSent = msg.sender === currentUserId;

  if (isSent) {
    messageDiv.classList.add("sent");
  } else {
    messageDiv.classList.add("received");
  }

  messageDiv.classList.add(msg.timestamp);

  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  let seenHTML = "";
  if (isSent) {
    // Single check if not seen, double if seen
    seenHTML = `<span class="seen-icon">${msg.seen ? "✔✔" : "✔"}</span>`;
  }

  messageDiv.innerHTML = `
    <div class="message-content">
      <p class="text">${msg.text}</p>
      <span class="timestamp">${time} ${seenHTML}</span>
    </div>
  `;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

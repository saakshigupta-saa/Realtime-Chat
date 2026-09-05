# 💬 Real-Time Chat

A real-time chat application built with **React, Node.js, Express, and Socket.io**.
The application enables users to communicate instantly through room-based channels with live typing indicators.

## 🚀 Features

* ⚡ Real-time bidirectional communication using Socket.io
* 👤 Username-based chat
* 💬 Instant message delivery
* ⌨️ Live typing indicators
* 🏠 Multiple chat rooms

  * General
  * Tech Support
* 🔒 Room-based message broadcasting
* 🟢 Connection status indicator
* 📱 Responsive chat interface
* 🎨 Clean Instagram-inspired UI
* 🔄 Automatic room switching
* 🧹 Proper Socket.io event listener cleanup

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Socket.io Client
* CSS

### Backend

* Node.js
* Express.js
* Socket.io
* CORS

## 📁 Project Structure

```text
Realtime-Chat/
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── socket.js
│   └── main.jsx
│
├── public/
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/saakshigupta-saa/Realtime-Chat.git
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Start the backend

From the `server` folder:

```bash
node server.js
```

The Socket.io server runs on:

```text
http://localhost:5000
```

### 5. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The Vite development server will run on the local URL shown in your terminal.

## 💬 How It Works

1. The React frontend establishes a persistent Socket.io connection with the Node.js server.
2. Users enter a username and select a chat room.
3. When a user sends a message, the frontend emits a `send_message` event.
4. The server receives the message and broadcasts it only to users in the selected room.
5. Incoming messages are displayed instantly in the chat interface.
6. When a user types, a `typing` event is emitted.
7. Other users in the same room see the typing indicator.

## 🏠 Available Rooms

### General

A common room for general conversations.

### Tech Support

A dedicated room for technical discussions and support.

Messages are isolated between rooms, so users in one room do not receive messages from another room.

## 🔌 Socket Events

| Event             | Direction       | Purpose                        |
| ----------------- | --------------- | ------------------------------ |
| `connection`      | Client → Server | Establish Socket.io connection |
| `join_room`       | Client → Server | Join a selected room           |
| `send_message`    | Client → Server | Send a chat message            |
| `receive_message` | Server → Client | Deliver a message              |
| `typing`          | Client → Server | Notify that a user is typing   |
| `typing`          | Server → Client | Display typing indicator       |
| `disconnect`      | Client → Server | Handle disconnected clients    |

## 🧪 Testing

The application can be tested by opening **two browser windows** running the frontend.

Test the following:

* Connect both clients
* Use different usernames
* Join the same room
* Send messages between clients
* Verify messages appear instantly
* Type in one client and verify the typing indicator appears in the other
* Switch one client to another room
* Verify room messages remain isolated

## 📌 Project Objective

The main objective of this project is to demonstrate:

* WebSocket-based communication
* Socket.io client-server architecture
* Real-time event handling
* Room-based broadcasting
* Typing indicators
* Persistent client-server connections
* React integration with Socket.io

## 👩‍💻 Author

**Sakshi Gupta**



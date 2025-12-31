# Real-time-chat-application

*COMPANY: CODETECH IT SOLUTIONS

*NAME: M.ABIRAMI

*INTERN ID: CTIS0867

*DOMAIN: FRONT END DEVELOPMENT

*DURATION: 4 WEEKS

*MENTOR: NEELA SANTOSH

#Project Description

The Real-Time Chat Application is a full-stack web-based communication system designed to enable multiple users to exchange messages instantly over the internet. The primary goal of this project is to demonstrate how real-time communication can be implemented efficiently using modern web technologies while ensuring data persistence, scalability, and a smooth user experience.

This application allows users to join a chat room by entering a username, send and receive messages in real time, view online users, and see system notifications when users join or leave the chat. Unlike basic chat applications where messages are stored only in memory, this project integrates a database system so that messages are stored permanently and can be retrieved even after refreshing the page or restarting the server.

#Platform Used:

This project is developed and executed on the Web Platform, using both frontend and backend technologies. The backend runs on a Node.js server, while the frontend is built using React.js. The application uses MongoDB as the database to store chat messages permanently.

The project runs on the following platforms:

Operating System: Windows (can also run on Linux and macOS)

Backend Platform: Node.js

Frontend Platform: Web Browser (Google Chrome, Firefox, Edge, etc.)

Database Platform: MongoDB Community Edition

#Technologies Used:

#Frontend Technologies:

React.js: Used to build a dynamic and responsive user interface.

HTML5: Provides the structure of the web application.

CSS3: Used for styling the chat interface, message layout, and responsiveness.

Socket.IO Client: Enables real-time communication between the frontend and backend.

#Backend Technologies:

Node.js: Provides the runtime environment for executing JavaScript on the server.

Express.js: Used to create and manage the HTTP server.

Socket.IO: Handles real-time, bidirectional communication between users.

CORS: Allows secure communication between frontend and backend running on different ports.

#Database:

MongoDB: A NoSQL database used to store chat messages as JSON documents.

Mongoose: An Object Data Modeling (ODM) library that simplifies database operations and schema management.

#About the Project:

The Real-Time Chat Application works on a client-server architecture. When a user opens the application, they are prompted to enter a username. Once the user joins, a WebSocket connection is established between the client and the server using Socket.IO. This persistent connection allows messages to be transmitted instantly without refreshing the page.

When a user sends a message, the message is first sent to the backend server. The server saves the message in MongoDB using Mongoose and then broadcasts it to all connected users. This ensures that every user sees the message in real time. Additionally, when a new user joins the chat, the server retrieves the most recent messages from the database and sends them to the user, allowing them to view previous conversations.

The application also maintains a list of currently online users. Whenever a user joins or leaves the chat, the server updates the user list and broadcasts it to all connected clients. System messages are displayed to notify users when someone joins or leaves the chat, improving user awareness and interaction.

To enhance usability, the application stores the username in the browser’s local storage. This allows users to refresh the page without being asked to re-enter their username. After refreshing, the user is automatically reconnected to the chat and the message history is loaded from the database.

#Features of the Project:

Real-time message delivery without page refresh

Permanent message storage using MongoDB

Automatic message history loading for new users

Online user list display

System notifications for user join and leave events

Responsive and user-friendly interface

Secure and scalable architecture

#Conclusion:

This Real-Time Chat Application is a practical implementation of modern web development concepts such as real-time communication, client-server architecture, and database persistence. It demonstrates how frontend and backend technologies can work together seamlessly to create an interactive and reliable communication platform. The project is suitable for academic submissions and serves as a strong foundation for building advanced chat systems with features like private messaging, authentication, and media sharing in the future.


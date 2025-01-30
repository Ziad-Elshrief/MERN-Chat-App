# Real Time Chat App

Real time chat app with rooms that use Node.js and Express server.
The server serves a React frontend as a static folder and both can communicate using socket.io.
Using a modern responsive Tailwind styled frontend, you can join a room by entering a username and the room name you want to join.
Once you join a room, a chat box gets displayed where you can send messages that arrive to each user in this room.

## Features:

1. Chat rooms with multiple users.
2. Ability to see who is currently in the room and announcement is sent whenvr someone leaves or joins.
3. Ability to choose an avatar when joining a room.
4. Ability to send both text and image messages.
5. Ability to reply to messages and press on it to view it
6. Ability to react to messages and view others' reacts on messages.
7. Scroll to bottom button in the corner of the chat window.
8. Ability to view images inside the chat window.

## Deployed Version

[Railway](https://react-chat-app-production-a349.up.railway.app/)

## For deployment:

- **Custom build command:** cd Real-Time-Chat-Frontend && npm install && npm run build  
&& cd .. && cdReal-Time-Chat-Server && npm install && npm run build 

- **Custom start command:** cd Real-Time-Chat-Server && node dist/server.js

## Acknowledgements

The app design is based on bradtraversy chat-cord tutorial which is focused on using socket io with basic HTML , CSS and vanilla JS.

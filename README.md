# Real Time Chat App

MERN stack Real time chat app with user registeration and chat rooms.
The server serves a React frontend as a static folder and both can communicate using socket.io.
Using a modern responsive Tailwind styled frontend.
You can create and log in into your own account to join rooms and update your profile
Once you join a room, a chat box gets displayed where you can send messages that arrive to each user in this room.

## Features:

1. Chat rooms with multiple users.
2. Ability to see who is currently in the room and announcement is sent whenever someone leaves or joins.
3. Ability to create an account and log in to it.
4. Ability to send both text and image messages.
5. Ability to reply to messages and press on it to view it
6. Ability to react to messages and view others' reacts on messages.
7. Scroll to bottom button in the corner of the chat window.
8. Ability to view images inside the chat window.
9. Ability to update your profile info and change your password or delete your account.
10. Ability to join from multiple devices.

## Tech Features:

1. Mongodb database to store users registered.
2. User validation using express api routes that depends on http only cookies and jwt access and refresh tokens to garntee security.

## Deployed Version

[Railway](https://react-chat-app-production-a349.up.railway.app/)

## For deployment:

- **Custom build command:** cd Real-Time-Chat-Frontend && npm install && npm run build  
  && cd .. && cd Real-Time-Chat-Server && npm install && npm run build

- **Custom start command:** cd Real-Time-Chat-Server && node dist/server.js

## Acknowledgements

The app design is based on bradtraversy chat-cord tutorial which is focused on using socket io with basic HTML , CSS and vanilla JS.

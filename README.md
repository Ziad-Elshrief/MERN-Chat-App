# Real Time Chat App

Real time chat app with rooms that use Node.js and Express server.
The server serves a React frontend as a static folder and both can communicate using socket.io.
Using a modern responsive Tailwind styled frontend, you can join a room by entering a username and the room name you want to join.
Once you join a room, a chat box gets displayed where you can send messages that arrive to each user in this room.

## For developers

The backend doesn't automatically build the frontend, so make sure to use "npm run build" to update the dist folder whenever you change something and the server gets the build output from this server by just running the server.

## Acknowledgements

The app design is based on bradtraversy chat-cord tutorial.

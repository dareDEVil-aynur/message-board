# Message Board App

Welcome to the Message Board App, a real-time communication platform designed for local network interaction. Users can engage in discussions on various topics, seamlessly connecting with others within the same network.

## Requirements

Ensure these ports are available before launching the app:

- **Client**: Port 3000
- **Server**: Port 3001

## Quick Start

Run the following command to start both the server and client simultaneously, installing any necessary dependencies:

```bash
npm run start
```

Access the app and API documentation at:

- **Client**: [http://localhost:3000/](http://localhost:3000/)
- **Server & Docs**: [http://localhost:3001/docs/](http://localhost:3001/docs/)

## Technologies

This app uses:

- **TypeScript** for type-safe code.
- **React** & **Redux Toolkit** for the frontend architecture.
- **RTK Query** for data fetching and caching.
- **Material UI** for UI components.
- **Express** & **WebSocket (WS)** for the backend.
- **Swagger UI** for API documentation.

## Features

- **Real-Time Communication**: Utilizes WebSockets for live message updates.
- **User-Friendly Interface**: Material UI components for a modern look and feel.
- **Efficient Data Management**: RTK Query for optimal state management and API interactions.
- **Interactive API Docs**: Swagger UI for easy testing of backend endpoints.

## Application Flow

1. **Username Prompt**: On load, users are asked to enter a username, stored in the Redux state.
2. **Channel Navigation**: Users can select different channels to view and participate in discussions.
3. **Message Display**: Shows real-time messages for the active channel.
4. **Message Posting**: Users can write and send messages in the selected channel. Messages are broadcasted to all users and updated live.

## Development

- **Client Development**: Run `npm run dev` for a hot-reloaded development environment.
- **Server Setup**: Independently start the server with WebSocket support using `npm run start`.

Enjoy communicating on the Message Board App, built with care for real-time interaction and seamless user experience.

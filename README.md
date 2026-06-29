# Campus Marketplace - Frontend

A buy and sell marketplace for a campus. Students post items in a few categories,
browse listings, and chat with each other in real time to negotiate, with live
notifications and unread message counts. Sellers manage their own listings and mark
them sold.

This is the frontend repo, built with React and Vite. It talks to a separate Node and
Express backend.

## Tech stack

- React with Vite
- React Router for navigation
- socket.io-client for real-time chat
- Context API for chat state
- Tailwind CSS for styling

## Features

- Account sign up and login
- Post items in four categories: cycles, books, electronics and academics
- Browse and filter active listings
- Real-time chat between buyers and sellers
- Browser notifications for new messages
- Unread message counts per conversation
- A dashboard to edit, delete or mark your own listings sold

## How it connects to the backend

Listings and auth go over normal REST calls. The chat uses a Socket.io connection
that is opened with the user's token.

When you open a chat on an item, the app asks the backend for the conversation for
that buyer, seller and item (or creates one). Messages then arrive over the socket
and appear instantly. New messages also trigger a browser notification and update the
unread count.

```
you send a message -> socket -> backend -> appears on the other person's screen
```

## Project structure

```
src/
  main.jsx                 entry point, wraps the app in the providers
  App.jsx                  routes
  context/
    ChatContext.jsx        opens the socket, tracks messages and unread counts
    LoadingContext.jsx
  utils/
    api.js                 API base URL and a fetch helper that adds the token
    categoryStyles.js      the four categories and their styles
  pages/
    Home.jsx               browse and filter listings
    CreateListing.jsx      the sell form
    ProductDetails.jsx     view an item and start a chat
    Chat.jsx               the messaging screen
    Dashboard.jsx          your own listings
    Auth.jsx               login and register
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- The backend running (locally or deployed)

### Install and run

```bash
npm install
npm run dev
```

Vite starts the dev server on http://localhost:5173.

### Environment variables

Set the backend URL in a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## Build and deploy

```bash
npm run build
```

This produces a static build in `dist/` that can be hosted on Vercel or Netlify.
Point the backend URL at your deployed server, and make sure the server allows this
site's URL in its CORS settings.
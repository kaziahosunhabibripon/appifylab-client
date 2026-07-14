# AppifyLab Client

AppifyLab Client is a modern social feed frontend built with Next.js, React, TypeScript, and Tailwind CSS. The application provides a clean user experience for authentication, profile-aware feed browsing, post creation, comments, replies, and like interactions.

The current app metadata uses the product name **Buddy Script** and is designed to connect with a REST API backend.

## Overview

This project is the client-side application for a social networking style product. It focuses on common community features such as user registration, login, timeline feed, post publishing, media posts, comments, nested replies, and likes.

## Key Features

- User registration and login screens
- Token-based authenticated API requests
- Protected social feed experience
- Post listing with owner information, timestamps, images, comments, and likes
- Post composer with text and image upload support
- Comment and reply interactions
- Like/unlike support for posts, comments, and replies
- Responsive feed layout with left and right sidebars
- Reusable UI components for buttons, cards, inputs, textarea, and avatars
- Static design assets, fonts, images, and legacy HTML templates included

## Technology Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Component Utilities:** Radix Slot, Class Variance Authority, clsx, tailwind-merge
- **Build Tooling:** Next.js App Router
- **Type Checking:** TypeScript compiler
- **Package Manager:** npm
- **API Integration:** Browser Fetch API with bearer token support

## Project Structure

```text
app/
  feed/              Feed route
  login/             Login route
  register/          Registration route
  globals.css        Global styles
  layout.tsx         Root layout and metadata

components/
  auth/              Authentication screens and forms
  feed/              Feed header, composer, posts, comments, sidebars
  ui/                Shared UI primitives

lib/
  api.ts             API client and endpoint methods
  auth-storage.ts    Client-side auth token storage helpers
  types.ts           Shared TypeScript types
  utils.ts           Utility helpers

assets/              Source static assets
public/assets/       Publicly served static assets
```

## Main Use Cases

- **Social media feed:** Users can browse posts, react to content, and join conversations.
- **Community platform:** Suitable as a base client for communities, groups, or internal networks.
- **MVP frontend:** Can be connected to an existing backend API to demonstrate authentication and feed workflows.
- **Portfolio or task submission:** Shows practical Next.js, React, TypeScript, Tailwind, and API integration skills.
- **Frontend starter:** Provides reusable UI patterns for auth, feed cards, nested comments, and responsive layouts.

## API Configuration

The frontend reads the backend API base URL from:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

If this variable is not provided, the app defaults to:

```text
http://localhost:8000/api/v1
```

Create a local environment file when needed:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your backend URL.

## API Endpoints Used

The client currently expects these backend routes:

- `POST /auth/login`
- `POST /auth/register`
- `GET /users/me`
- `GET /posts`
- `POST /posts`
- `POST /posts/{postId}/comments`
- `POST /comments/{commentId}/replies`
- `POST /likes/{targetType}/{targetId}/toggle`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build.

```bash
npm run lint
```

Runs TypeScript checks with `tsc --noEmit`.

## Environment And Git Notes

The repository is configured to ignore local and generated files such as:

- `.env.local`
- `node_modules/`
- `.next/`
- `*.tsbuildinfo`

This keeps secrets, dependencies, and build output out of version control.

## License

This project currently uses the ISC license as defined in `package.json`.

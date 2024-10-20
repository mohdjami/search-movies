# Next.js Project with Prisma and Supabase

This project is a movie playlist application that allows users to sign in, search for movies, add them to a playlist, create new playlists, view their playlists on a dashboard, and share them publicly or privately.

## Setup

To set up a Next.js project with Prisma and Supabase, follow these steps:

1. Install dependencies by running `npm install`
2. Generate Prisma Client by running `npx prisma generate` .
3. Set up your Supabase account and get the URL and public anonymous key. Add these to your `.env.local` file as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` respectively.
4. Setup other env variables by changing into .env.example file.
5. Run `npm run dev`

## Authentication

We use NextAuth for authentication with Google, GitHub, and credentials providers.

For signing in with credentials, you need to first verify your email. An email will be sent to you for verification. After verifying, you can sign in again.

## Features

- **Search Movies:** Users can search for movies to add to their playlists.
- **Create Playlists:** Users can create new playlists and add movies to them.
- **View Playlists:** Users can view their playlists on the dashboard.
- **Share Playlists:** Users can share their playlists publicly or privately.

## Here is the demo of the APP
https://vimeo.com/1021470691?share=copy
Enjoy the application!

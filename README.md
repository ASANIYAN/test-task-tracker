# Getting Started with Your Next.js App

This guide will walk you through the process of setting up and running a basic Next.js application.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Step 1: Create a new Next.js App

Open your terminal and run the following command to create a new Next.js app:

```bash
npx create-next-app my-next-app
```

This will scaffold a new Next.js app in a directory called `my-next-app`.

## Step 2: Navigate to Your App Directory

Change into the newly created app directory:

```bash
cd my-next-app
```

## Step 3: Run Your Next.js App

Start your Next.js app by running the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will launch your app in development mode. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view your app.

## Step 4: Explore and Edit

Open the `pages/index.js` file in your code editor. This is the default landing page of your app. Make changes to see them reflected instantly in your browser.

## Step 5: Build for Production

When you are ready to deploy your app, build it using the following command:

```bash
npm run build
```

This will create an optimized production build in the `out` directory.

## Step 6: Run in Production Mode

To run your app in production mode, use the following command:

```bash
npm start
```

Your app is now ready for production deployment.

## Additional Resources

For more information on Next.js and its features, refer to the [official documentation](https://nextjs.org/docs).

That's it! You've successfully set up and run a Next.js app. Happy coding!

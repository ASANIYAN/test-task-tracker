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

# Reason for Design Choice

## Overview

This project aims to provide a solution for task management. After careful consideration, a Kanban board design has been chosen for its ability to effectively represent a task management app.

## Why a Kanban Board?

### Visual Representation

A Kanban board offers a visual representation of tasks, providing a clear and intuitive overview of the workflow. The board is divided into columns, each representing a different stage in the task lifecycle, such as "To Do," "In Progress," "Pending," and "Completed." This visual layout allows users to quickly grasp the current status of tasks.

### Workflow Management

Kanban boards facilitate easy workflow management. Users can easily move tasks between columns, reflecting the transition of tasks from one stage to another. This simplicity streamlines the task management process, ensuring that everyone involved in a project has a shared understanding of the work's progression.

### Flexibility

One of the key advantages of a Kanban board is its flexibility. The board can be adapted to various project management methodologies, making it suitable for a wide range of task management scenarios. Users can customize columns, labels, and other elements to align with their specific workflows and requirements.

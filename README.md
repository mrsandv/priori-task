## 🎯 Prioritask - To-Do App to Rank Tasks

A simple yet effective To-Do list app built with Next.js and Tailwind CSS.

The twist in this project is priority system that automatically sorts your pending taks to help you focus on what matter most.

This projects was a short development simulating the environment of an interview to demostrate the quick implementation of key React and Typescript concepts.

[Demo](https://todo.spacehole.tech)

![Priori-task screen](https://x27ogsxot4y4om7r.public.blob.vercel-storage.com/todo.png)

## ✨ Features

- Task Management: Create, complete, and delete tasks.

- Priority System: Assign one of four priority levels (Urgen, important, next week, Not important).

- Automatic Sorting: All the list "Pending" and "Completed" are sorted by priority, showing the most urgent tasks first.

- Conditional Styling: Each task has a different border color depending on its priority, making it easy to identify visually.

- Data Persistence: Tasks are automatically saved in the browser's `localStorage`, so ther're not lost when you reload the page.

## 🛠️ Tech Stack

This project was built using:

- Next.js (App Router) - Framework for React.

- React - For building the user interface.

- TypeScript - For string typing and safer code.

- Tailwind CSS - For fast, modern styling.

- React Hooks - (`useState` and `useEffect`) for state management and persistence.

## 💡 Key learnings

Beyond a simple To-Do lists, this project was a good exercise to practice:

- Immutable State Management: Using `.map` and `.filter()` to update the tasks array without mutating it.

- Effect Hooks (`useEffect`): Implementing two separate `useState` hooks:

  - One to load the tasks to `localStorage` only once (with `[]` as a dependency).

  - Another to save tasks to `localStorage` every time the `tasks` state changes (with `[tasks]` as a dependency).

- Type-Safety Forms: Handling `onChange` events for multiple input types (text and select) while ensuring data consistency.

- Conditional and Dynamic Rendering: Using `priorityMap` to apply tailwind styles dynamically.

## 🚀 Getting Started

This is a Next.js project.

First, install the dependencies:

```bash
pnpm i
```

o use yarn, npm... your choice.

Then, run the development server:

Bash

```bash
pnpm run dev
```

Open http://localhost:3000 in your browser to see the result.

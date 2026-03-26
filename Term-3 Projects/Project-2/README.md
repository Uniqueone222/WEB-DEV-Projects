# AI Powered Study Companion

This repo contains a React study-management app that helps you organize subjects/topics, plan study tasks, track progress, schedule revisions, and generate AI-assisted study help.

## Features

1. Subject management
   - Create and delete subjects
   - Add topics under a subject
   - Update topic status (Not Started, In Progress, Completed, Needs Revision)

2. Task management
   - Create and delete tasks
   - Toggle tasks between Pending and Completed
   - Mark completed tasks for Revision
   - Task tabs: All, Pending, Completed, Overdue, Revision
   - Search: filters by task title, subject name, and (optional) topic
   - Filtering: by subject and priority
   - Sorting: by due date, priority, or subject name

3. Study progress dashboard
   - KPI cards: total, completed, pending, revision, overdue
   - Charts using `recharts`:
     - Completion breakdown (pie chart)
     - Completed vs total tasks per subject (bar chart)
   - Upcoming revisions list

4. Revision planner
   - Schedule revision sessions using a calendar (`react-calendar`)
   - Pick a subject and topic, then select the revision date
   - Highlight calendar dates that have revisions

5. AI study assistant
   - Generate:
     - Topic summaries
     - Practice questions
     - Flashcards
   - Uses the Hugging Face Inference API (OpenAI-compatible chat router) via `study-companion/src/services/aiService.js`

## PRD notes (implementation differences)

- Search/filter scope: the PRD mentions searching tasks/topics/notes; current UI searches task title, subject name, and optional topic (topic/task notes are not exposed in the current forms).
- Deadline filtering: the PRD mentions deadline filtering; this app instead provides an `Overdue` tab (derived from the deadline) and sorting by due date.

## Routes

The app uses React Router and exposes:

`/dashboard`
`/subjects`
`/tasks`
`/revision`
`/ai-tools`

## Data persistence (no backend)

The app stores your data in `localStorage`:

- `subjects`
- `topics`
- `tasks`
- `revisionSchedule`

## Setup and run locally

1. Install dependencies

```sh
cd "study-companion"
npm install
```

2. (Optional) Add an AI API key

Create `study-companion/.env`:

```env
VITE_HF_API_KEY=your_token_here
```

Note: the AI tools page will fail gracefully if the key is missing, but the rest of the app works. Keep `.env` out of version control (it is gitignored).

3. Start the dev server

```sh
npm run dev
```

4. Open the URL shown in the terminal (typically `http://localhost:5173`).

## Project structure (high level)

- `study-companion/src/context/StudyContext.jsx`: global state + localStorage syncing
- `study-companion/src/hooks/`
  - `useSubjects.js`: subjects/topics CRUD
  - `useTasks.js`: tasks CRUD + revision marking
  - `useProgress.js`: dashboard KPIs + chart data
- `study-companion/src/pages/`
  - `Dashboard.jsx`, `Subjects.jsx`, `Tasks.jsx`, `Revision.jsx`, `AITools.jsx`
- `study-companion/src/services/aiService.js`: AI generation functions

## Scripts

From `study-companion/`:

- `npm run dev`: start Vite dev server
- `npm run build`: build for production
- `npm run lint`: eslint
- `npm run preview`: preview production build


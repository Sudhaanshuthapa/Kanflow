# Kanflow

A Kanban board for tailoring and fashion workshops. Orders move through **In Queue → On the Needle → Completed**, with category tags, a live progress ring and stats that update as you work.

Built over a weekend with Next.js, Tailwind CSS and shadcn/ui.



## Features

- **Drag and drop** tasks between columns with mouse, touch (press and hold) or keyboard (Space to pick up, arrows to move, Esc to cancel)
- **Live progress ring and stats**: the segmented ring, TOTAL, IN PROGRESS, DUE THIS WEEK and COMPLETED are all derived from the task list
- **Projects**: create a new project from the "+ New Project" button and switch between them from the "Active Workshop" selector
- **Tasks**: add, edit and delete tasks through a dialog with a title, description (50 character limit), project and priority
- **Category tags**: `# Custom`, `# Repair`, `# Urgent` and `# Standard` shown as pills
- **Sorting**: A-Z or Z-A by task title
- **Light and dark mode**
- **Empty states**, including a yarn ball for an empty "Completed" column

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Components | [shadcn/ui](https://ui.shadcn.com/) (Base UI variant) |
| Drag and drop | [dnd-kit](https://dndkit.com/) |
| Icons | [lucide-react](https://lucide.dev/), [react-icons](https://react-icons.github.io/react-icons/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project with ESLint |

## Project structure

```
app/
├── layout.tsx                  # Root layout, font and theme provider
├── page.tsx                    # Page composition
├── globals.css                 # Design tokens (colors, radius, fonts)
├── mode-toggle.tsx             # Light / dark / system switch
└── Components/
    ├── workshop-context.tsx    # Shared state: tasks, projects, sort, dialogs, derived stats
    ├── nav-bar/                # Logo, search, "+ New Project" button
    ├── projects-area/
    │   ├── project-header/     # Title, sort dropdown, "+ Add Task"
    │   └── project-taskboards/ # Columns, task cards, drag and drop
    ├── right-sidebar/          # Project selector, progress ring, stats grid
    ├── drop-downs/             # Sorting, task menu, project selection
    └── dialogs/                # Add / edit task and new project dialogs
components/ui/                  # shadcn/ui primitives (button, card, dialog, ...)
lib/utils.ts                    # cn() class helper
```

## How it works

All app state lives in `WorkshopProvider` (`app/Components/workshop-context.tsx`) and is read with the `useWorkshop()` hook. Stats are never stored. They are computed from the active project's tasks:

| Stat | Rule |
| --- | --- |
| TOTAL | All tasks in the project |
| IN PROGRESS | Tasks in "On the Needle" |
| COMPLETED | Tasks in "Completed" |
| DUE THIS WEEK | Unfinished tasks with High priority (`# Urgent`) |
| Ring % | Completed tasks as a share of all tasks |

The Add Task dialog's priority maps to the tag shown on the card: Low → `# Standard`, Medium → `# Custom`, High → `# Urgent`. `# Repair` currently appears only on sample data.

## Known limitations

- **No persistence.** Tasks and projects are held in memory and reset on refresh.
- **"Due this week"** is based on priority because tasks have no due date field yet.
- **Search bar** is visual only and does not filter yet.
- **Within a column**, order follows the A-Z / Z-A sort, so tasks can't be reordered by hand.

## Roadmap

- [ ] Save data (localStorage or a database)
- [ ] Real due dates
- [ ] Working search
- [ ] Manual ordering inside columns
- [ ] Delete and rename projects

## License

MIT, or replace with your preferred license.

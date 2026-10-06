export const initialProjects = [
  {
    id: 1,
    name: "Personal Portfolio",
    description:
      "Professional developer portfolio showcasing projects, skills and experience.",
    category: "Web Development",
    status: "In Progress",
    priority: "High",
    deadline: "2026-10-15",
    color: "indigo",
    tasks: [
      {
        id: 101,
        title: "Create portfolio structure",
        completed: true,
      },
      {
        id: 102,
        title: "Build project section",
        completed: true,
      },
      {
        id: 103,
        title: "Add responsive design",
        completed: false,
      },
      {
        id: 104,
        title: "Deploy portfolio",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Food Ordering Platform",
    description:
      "Full-stack food ordering platform with restaurant, order and payment management.",
    category: "Full Stack",
    status: "Planning",
    priority: "Medium",
    deadline: "2026-11-20",
    color: "emerald",
    tasks: [
      {
        id: 201,
        title: "Design database",
        completed: false,
      },
      {
        id: 202,
        title: "Create authentication",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Developer Task Tracker",
    description:
      "Simple productivity application for managing daily development tasks.",
    category: "Productivity",
    status: "Completed",
    priority: "Low",
    deadline: "2026-08-30",
    color: "violet",
    tasks: [
      {
        id: 301,
        title: "Build dashboard",
        completed: true,
      },
      {
        id: 302,
        title: "Add task management",
        completed: true,
      },
      {
        id: 303,
        title: "Implement LocalStorage",
        completed: true,
      },
    ],
  },
];

export const initialActivities = [
  {
    id: 1,
    message: "Personal Portfolio project created",
    time: "Today",
    type: "project",
  },
  {
    id: 2,
    message: "Food Ordering Platform moved to Planning",
    time: "Yesterday",
    type: "status",
  },
  {
    id: 3,
    message: "Developer Task Tracker completed",
    time: "2 days ago",
    type: "complete",
  },
];
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const statusStyles = {
  Planning:
    "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress":
    "bg-blue-50 text-blue-700 border-blue-200",
  Completed:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  "On Hold":
    "bg-slate-100 text-slate-600 border-slate-200",
};

const priorityStyles = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600",
};

function ProjectCard({
  project,
  onEdit,
  onDelete,
  onOpenTasks,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const totalTasks = project.tasks.length;

  const completedTasks = project.tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">
            {project.name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-900">
              {project.name}
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              {project.category}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-10 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
              <button
                onClick={() => {
                  onEdit(project);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={() => {
                  onDelete(project.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </span>

        <span
          className={`text-xs font-semibold ${
            priorityStyles[project.priority]
          }`}
        >
          {project.priority} Priority
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Progress
          </span>

          <span className="text-xs font-bold text-slate-700">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={15} />
          {project.deadline
            ? new Date(
                project.deadline
              ).toLocaleDateString()
            : "No deadline"}
        </div>

        <button
          onClick={() => onOpenTasks(project)}
          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          {completedTasks === totalTasks &&
          totalTasks > 0 ? (
            <CheckCircle2 size={15} />
          ) : (
            <Circle size={15} />
          )}

          {completedTasks}/{totalTasks} Tasks
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
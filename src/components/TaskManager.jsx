import { Plus } from "lucide-react";
import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskManager({
  project,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) {
  const [taskTitle, setTaskTitle] = useState("");

  const completedTasks = project.tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = project.tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const handleAddTask = (e) => {
    e.preventDefault();

    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(project.id, trimmedTitle);

    setTaskTitle("");
  };

  const handleToggleTask = (taskId) => {
    onToggleTask(project.id, taskId);
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(project.id, taskId);
  };

  return (
    <div className="p-6">
      {/* Project Information */}
      <div className="mb-5 rounded-2xl bg-slate-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {project.name}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {project.description ||
                "No project description available."}
            </p>
          </div>

          {/* Progress */}
          <div className="shrink-0">
            <p className="text-right text-xs font-semibold text-slate-500">
              {completedTasks}/{totalTasks} completed
            </p>

            <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="mt-1 text-right text-xs font-bold text-indigo-600">
              {progress}%
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="mb-5 flex gap-2"
      >
        <input
          type="text"
          value={taskTitle}
          onChange={(e) =>
            setTaskTitle(e.target.value)
          }
          placeholder="Add a new task..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="submit"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
        >
          <Plus size={17} />

          <span className="hidden sm:inline">
            Add Task
          </span>
        </button>
      </form>

      {/* Task List */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">
            Project Tasks
          </h4>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            {totalTasks}{" "}
            {totalTasks === 1
              ? "Task"
              : "Tasks"}
          </span>
        </div>

        {project.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Plus size={20} />
            </div>

            <h4 className="mt-3 text-sm font-semibold text-slate-700">
              No tasks yet
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              Add your first task using the field
              above.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskManager;
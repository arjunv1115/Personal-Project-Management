import { Check, Trash2 } from "lucide-react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition hover:border-slate-200 hover:bg-slate-50">
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white text-transparent hover:border-indigo-400"
        }`}
        aria-label={
          task.completed
            ? "Mark task as incomplete"
            : "Mark task as completed"
        }
      >
        <Check size={14} strokeWidth={3} />
      </button>

      {/* Task Title */}
      <span
        className={`min-w-0 flex-1 text-sm transition ${
          task.completed
            ? "text-slate-400 line-through"
            : "text-slate-700"
        }`}
      >
        {task.title}
      </span>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="rounded-lg p-2 text-slate-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default TaskItem;
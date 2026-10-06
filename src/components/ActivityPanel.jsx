import {
  CheckCircle2,
  CircleDot,
  FolderPlus,
  Activity,
} from "lucide-react";

function ActivityPanel({ activities }) {
  const getIcon = (type) => {
    if (type === "complete") {
      return CheckCircle2;
    }

    if (type === "project") {
      return FolderPlus;
    }

    return CircleDot;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Your latest workspace updates
          </p>
        </div>

        <Activity
          size={20}
          className="text-indigo-500"
        />
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">
            No activity yet.
          </p>
        ) : (
          activities.slice(0, 6).map((activity) => {
            const Icon = getIcon(activity.type);

            return (
              <div
                key={activity.id}
                className="flex gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm leading-5 text-slate-700">
                    {activity.message}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ActivityPanel;
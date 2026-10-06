import { useMemo, useState } from "react";
import { FolderKanban, CheckCircle2, Clock3, ListTodo, Plus, Filter } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import ProjectCard from "./components/ProjectCard";
import Modal from "./components/Modal";
import ProjectForm from "./components/ProjectForm";
import TaskManager from "./components/TaskManager";
import ActivityPanel from "./components/ActivityPanel";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialProjects, initialActivities } from "./data/initialData";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";


function ProjectHub() {
  const { user } = useAuth();
  const [projects, setProjects] = useLocalStorage(`projectHub_projects_${user.id}`, initialProjects);
  const [activities, setActivities] = useLocalStorage(`projectHub_activities_${user.id}`, initialActivities);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const stats = useMemo(() => {
    const totalProjects = projects.length;

    const completedProjects = projects.filter((project) => project.status === "Completed").length;
    const inProgressProjects = projects.filter((project) => project.status === "In Progress").length;
    const totalTasks = projects.reduce((total, project) => total + project.tasks.length, 0);
    const completedTasks = projects.reduce((total, project) => total + project.tasks.filter((task) => task.completed).length, 0);

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalTasks,
      completedTasks,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || project.description.toLowerCase().includes(search.toLowerCase()) || project.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    projects,
    search,
    statusFilter,
    priorityFilter,
  ]);

  const addActivity = (message, type = "status") => {
    const newActivity = {
      id: Date.now(),
      message,
      time: "Just now",
      type,
    };

    setActivities((prev) => [
      newActivity,
      ...prev,
    ]);
  };

  const openAddProject = () => {
    setEditingProject(null);
    setModal("project");
  };


  const handleCreateProject = (formData) => {
    const newProject = {
      id: Date.now(),
      ...formData,
      color: "indigo",
      tasks: [],
    };

    setProjects((prev) => [
      newProject,
      ...prev,
    ]);

    addActivity(
      `${newProject.name} project created`,
      "project"
    );

    setModal(null);
  };

  const handleUpdateProject = (formData) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === editingProject.id
          ? {
              ...project,
              ...formData,
            }
          : project
      )
    );

    addActivity(
      `${formData.name} project updated`,
      "status"
    );

    setModal(null);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Delete "${project.name}"?`
    );

    if (!confirmed) return;

    setProjects((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    addActivity(
      `${project.name} project deleted`,
      "status"
    );
  };

  const handleAddTask = (projectId, taskTitle) => {
    setProjects((prev) => prev.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        return {
          ...project,
          tasks: [
            ...project.tasks,
            {
              id: Date.now(),
              title: taskTitle,
              completed: false,
            },
          ],
        };
      })
    );

    const project = projects.find(
      (item) => item.id === projectId
    );

    if (project) {
      addActivity(
        `New task added to ${project.name}`,
        "status"
      );
    }
  };

  const handleToggleTask = (projectId, taskId) => {
    setProjects((prev) => prev.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        return {
          ...project,
          tasks: project.tasks.map(
            (task) =>
              task.id === taskId
                ? {
                    ...task,
                    completed:
                      !task.completed,
                  }
                : task
          ),
        };
      })
    );
  };

  const handleDeleteTask = (projectId, taskId) => {
    setProjects((prev) => prev.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        return {
          ...project,
          tasks: project.tasks.filter(
            (task) =>
              task.id !== taskId
          ),
        };
      })
    );
  };

  const openEditProject = (project) => {
    setEditingProject(project);
    setModal("project");
  };

  const openTasks = (project) => {
    setSelectedProject(project);
    setModal("tasks");
  };

  const renderDashboard = () => {
    return (
      <>
        <section className="mb-6">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">

            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-medium text-indigo-100">Welcome back 👋</p>
              <h1 className="text-2xl font-bold sm:text-3xl">Manage your Projects with Clarity.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100">Keep your Personal Projects,Tasks, Deadlines and Progress Organized in one Professional Workspace.</p>

              <button onClick={openAddProject} className="mt-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50">
                <Plus size={17} />
                Create New Project
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            subtitle="Projects in workspace"
            icon={FolderKanban}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            title="In Progress"
            value={stats.inProgressProjects}
            subtitle="Currently active"
            icon={Clock3}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Completed"
            value={stats.completedProjects}
            subtitle="Successfully finished"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Tasks"
            value={`${stats.completedTasks}/${stats.totalTasks}`}
            subtitle="Tasks completed"
            icon={ListTodo}
            iconClass="bg-violet-50 text-violet-600"
          />

        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_350px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Recent Projects</h2>
                <p className="mt-1 text-xs text-slate-400">Your latest Project Activity</p>
              </div>

              <button onClick={() => setActiveSection("projects")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View All
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects
                .slice(0, 4)
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={openEditProject}
                    onDelete={handleDeleteProject}
                    onOpenTasks={openTasks}
                  />
                ))}

            </div>
          </div>

          <ActivityPanel activities={activities}/>

        </section>
      </>
    );
  };

  const renderProjects = () => {
    return (
      <>
        <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
            <p className="mt-1 text-sm text-slate-500">Manage all your Personal Projects.</p>
          </div>

          <button onClick={openAddProject} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700">
            <Plus size={17} />
            New Project
          </button>
        </section>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter size={17} />
            Filters
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400">
            <option value="All">
              All Statuses
            </option>
            <option value="Planning">
              Planning
            </option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
            <option value="On Hold">
              On Hold
            </option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400">
            <option value="All">
              All Priorities
            </option>
            <option value="High">
              High
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">
              Low
            </option>
          </select>

          <span className="ml-auto self-center text-xs text-slate-400">
            {filteredProjects.length} projects
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <FolderKanban size={40} className="mx-auto text-slate-300"/>
            <h3 className="mt-4 font-bold text-slate-800">No Projects Found</h3>

            <p className="mt-1 text-sm text-slate-400">Try Changing your Search or Filters.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={openEditProject}
                  onDelete={handleDeleteProject}
                  onOpenTasks={openTasks}/>
              )
            )}
          </div>
        )}

      </>
    );
  };

  const renderTasks = () => {
    return (
      <>
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">View and Manage Tasks across your Projects.</p>
        </section>

        <div className="space-y-5">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {
                      project.tasks.filter(
                        (task) => task.completed
                      ).length
                    }{" "}
                    of {project.tasks.length}{" "}
                    Completed
                  </p>

                </div>

                <button onClick={() => openTasks(project)} className="text-sm font-semibold text-indigo-600">
                  Manage Tasks
                </button>
              </div>

              {project.tasks.length === 0 ? (
                <p className="text-sm text-slate-400">No Tasks Added yet.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {project.tasks.map(
                    (task) => (
                      <div key={task.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <CheckCircle2 size={17} className={task.completed ? "text-emerald-500" : "text-slate-300"}/>

                        <span className={`text-sm ${task.completed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {task.title}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderActivity = () => {
    return (
      <>
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Activity</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track Changes made in your Workspace.
          </p>
        </section>

        <div className="max-w-3xl">
          <ActivityPanel activities={activities}/>
        </div>
      </>
    );
  };

  const renderSettings = () => {
    return (
      <>
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your Local Project Workspace.
          </p>
        </section>

        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">
            Storage
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500"> 
            All project data, tasks and activity History are Currently Stored in your Browser's LocalStorage.
          </p>

          <div className="mt-5 rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-700">
              LocalStorage Enabled
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              Your Data Remains Available after Refreshing or Reopening the Browser.
            </p>
          </div>

          <button onClick={() => {
          const confirmed = window.confirm("This will Delete all your Projects and Activity History. Continue?");
              if (confirmed) {
                localStorage.removeItem(`projectHub_projects_${user.id}`);
                localStorage.removeItem(`projectHub_activities_${user.id}`);
                window.location.reload();
              }
            }}
            className="mt-5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
            Reset Workspace
          </button>
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return renderProjects();
      case "tasks":
        return renderTasks();
      case "activity":
        return renderActivity();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}/>

      <div className="lg:pl-64">
        <Header
          setMobileOpen={setMobileOpen}
          search={search}
          setSearch={setSearch}
          onAddProject={openAddProject}
        />

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {modal === "project" && (
        <Modal
          title={editingProject ? "Edit Project" : "Create New Project"}
          onClose={() => {
            setModal(null);
            setEditingProject(null);
          }}>

        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onClose={() => {
            setModal(null);
            setEditingProject(null);
          }}/>
        </Modal>
      )}

      {modal === "tasks" &&
        selectedProject && (
          <Modal
            title="Project Tasks"
            onClose={() => {
              setModal(null);
              setSelectedProject(null);
            }}>
            <TaskManager
              project={
                projects.find((item) => item.id === selectedProject.id) || selectedProject}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}/>
          </Modal>
        )}
    </div>
  );
}

function App() {
  const { user } = useAuth();
  if (!user) {
    return <AuthPage />;
  }

  return (
    <ProjectHub key={user.id} />
  );
}


export default App;
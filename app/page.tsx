"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TTask = {
  id: string;
  text: string;
  priority: 0 | 1 | 2 | 3;
  completed: boolean;
};

const priorityMap = {
  0: { copy: "Urgent", styles: "border-rose-500" },
  1: { copy: "Important", styles: "border-orange-500" },
  2: { copy: "Next week", styles: "border-green-500" },
  3: { copy: "Not important", styles: "border-indigo-500" },
};

type TTaskElement = TTask & {
  onCheck: (id: string) => void;
  onRemove: (id: string) => void;
};

const TaskElement = ({
  text,
  priority,
  completed,
  id,
  onCheck,
  onRemove,
}: TTaskElement) => (
  <li
    className={`flex h-10 bg-zinc-900 text-zinc-200 justify-between items-center p-2 ${priorityMap[priority].styles} border rounded-lg`}
  >
    <div className={`flex items-center ${completed ? "line-through":"" }`}>
      <input
        className="mx-2"
        type="checkbox"
        checked={completed}
        onChange={() => {
          onCheck(id);
        }}
      />
      {text}
    </div>
    <button
      className="cursor-pointer hover:opacity-70"
      onClick={() => {
        onRemove(id);
      }}
    >
      ❌
    </button>
  </li>
);

const createId = () => {
  return (Math.random() + 1).toString(36).substring(2, 10);
};

export default function Home() {
  const defaultTask: TTask = {
    text: "",
    id: "",
    priority: 3,
    completed: false,
  };
  const [task, setTask] = useState<TTask>(defaultTask);
  const [tasks, setTasks] = useState<TTask[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = createId();
    setTasks((prevTasks) => [...prevTasks, { ...task, id }]);
    setTask(defaultTask);
  };

  const handleCheck = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const handleRemove = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const taskCount = tasks.filter((t=>!t.completed)).length;
  const sortedTasks = [...tasks].sort((a,b)=> a.priority - b.priority)

  return (
    <main className="flex h-screen w-screen md:h-[70vh] md:w-[60vw] flex-col items-center justify-center p-5 bg-zinc-900 shadow shadow-rose-500/10 rounded-lg">
      <form
        className="bg-zinc-800 flex h-18 w-full md:w-1/2 text-black rounded-sm items-center justify-between p-3 gap-2"
        onSubmit={handleSubmit}
      >
        <input
          required
          className="w-full h-10 bg-zinc-50 p-2 rounded-sm text-zinc-800"
          type="text"
          value={task.text}
          onChange={handleChange}
          name="text"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={task.priority}
          className="p-2 text-zinc-200"
        >
          {Object.entries(priorityMap).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value.copy}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-rose-800 rounded-lg px-5 py-2 text-zinc-100 hover:opacity-70 cursor-pointer"
        >
          Add
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 p-2">
        <div className="h-[50vh] overflow-scroll">
          <h1 className="text-zinc-200 text-xl p-3 mx-auto w-full text-center my-2 uppercase">
            Pending
          </h1>
          <ul className="flex flex-col gap-2 overflow-scroll px-5">
            {sortedTasks
              .filter((item) => !item.completed)
              .map((it) => (
                <TaskElement
                  key={it.id}
                  {...it}
                  onCheck={handleCheck}
                  onRemove={handleRemove}
                />
              ))}
          </ul>
        </div>
        <div>
          <h1 className="text-zinc-200 text-xl p-3 mx-auto w-full text-center my-2 uppercase">
            Completed
          </h1>
          <ul className="flex flex-col gap-2 overflow-scroll px-5">
            {sortedTasks
              .filter((item) => item.completed)
              .map((it) => (
                <TaskElement
                  key={it.id}
                  {...it}
                  onCheck={handleCheck}
                  onRemove={handleRemove}
                />
              ))}
          </ul>
        </div>
      </div>

      <p className="text-zinc-200">
        You have {taskCount} pending tasks
      </p>
    </main>
  );
}

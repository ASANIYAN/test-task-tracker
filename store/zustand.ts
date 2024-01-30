import { Column, Id, Task } from "@/types/types";
import { generateId } from "@/utils/functions";
import { create } from "zustand";

const defaultTasks: Task[] = [];
const defaultCols: Column[] = [
  {
    id: "open",
    title: "Open",
  },
  {
    id: "pending",
    title: "Pending",
  },
  {
    id: "in-progress",
    title: "In-Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

type BoardStore = {
  tasks: Task[];
  setTasks: (callback: (tasks: Task[]) => Task[]) => void;
  columns: Column[];
  setColumns: (callback: (columns: Column[]) => Column[]) => void;
  updateTask: (id: Id, content: string, name: string, date: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  createNewColumn: () => void;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  tasks: defaultTasks,
  columns: defaultCols,
  setTasks: (callback) => {
    set((state) => ({
      tasks: callback(state.tasks),
    }));
  },
  setColumns: (callback) => {
    set((state) => ({
      columns: callback(state.columns),
    }));
  },
  createTask: (columnId) => {
    set((state) => {
      const newTask: Task = {
        id: generateId(),
        columnId,
        content: `Task description ${state.tasks.length + 1}`,
        date: new Date(),
        name: `Task name ${state.tasks.length + 1}`,
      };

      return { tasks: [...state.tasks, newTask] };
    });
  },
  updateTask: (id, content, name, date) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id !== id ? task : { ...task, content, name, date }
      );

      return { tasks: newTasks };
    });
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  createNewColumn: () => {
    set((state) => {
      const columnToAdd: Column = {
        id: generateId(),
        title: `Column ${state.columns.length + 1}`,
      };

      return { columns: [...state.columns, columnToAdd] };
    });
  },
  updateColumn: (id, title) => {
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id !== id ? col : { ...col, title }
      ),
    }));
  },
  deleteColumn: (id) => {
    set((state) => {
      const filteredColumns = state.columns.filter((col) => col.id !== id);

      const newTasks = state.tasks.filter((t) => t.columnId !== id);

      return { columns: filteredColumns, tasks: newTasks };
    });
  },
}));

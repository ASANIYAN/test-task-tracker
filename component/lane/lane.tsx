import { useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext } from "@dnd-kit/sortable";
import { Column, Id, Task } from "@/types/types";
import Card from "../card/card";

import { Trash, Add } from "iconsax-react";
import { useBoardStore } from "@/store/zustand";

interface LaneProps {
  column: Column;
}

function Lane(props: LaneProps) {
  const { column } = props;

  const {
    tasks: taskFromStore,
    createTask,
    updateColumn,
    deleteColumn,
  } = useBoardStore();

  const tasks = taskFromStore.filter((task) => task.columnId === column.id);

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    touchAction: "none",
  };

  if (isDragging) {
    return (
      <section
        ref={setNodeRef}
        style={style}
        className="opacity-40 border border-green-500 w-[350px] h-[540px] max-h-[540px] rounded-md flex flex-col"
      ></section>
    );
  }

  return (
    <section
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[450px] max-h-[450px] shadow-lg p-2.5 rounded-md flex flex-col"
    >
      {/* Column title */}
      <section
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 flex items-center justify-between"
      >
        <section className="flex gap-0.5 items-center">
          <p className="flex items-center justify-center p-1 text-sm rounded-full">
            {tasks.length}
          </p>

          {!editMode && column.title}
          {editMode && (
            <input
              className="focus:border-black border rounded outline-none h-full p-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </section>
        {/* For deleting columns */}
        {/* {column.id !== "open" && (
          <Trash
            size={32}
            color="#000"
            className="rounded px-1 py-2"
            onClick={() => deleteColumn(column.id)}
          />
        )} */}
      </section>
      <section className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </section>

      {column.id === "open" && (
        <button
          className="flex gap-2 items-center justify-center border-black border rounded-md p-4"
          onClick={() => createTask(column.id)}
        >
          <Add size={32} color="#000" />
          Add Task
        </button>
      )}
    </section>
  );
}

export default Lane;

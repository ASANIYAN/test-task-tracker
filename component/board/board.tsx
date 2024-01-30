"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { AddCircle } from "iconsax-react";

import { Column, Task } from "@/types/types";

import Lane from "../lane/lane";
import Card from "../card/card";
import { useBoardStore } from "@/store/zustand";

const Board = () => {
  const { setTasks, columns, setColumns, createNewColumn } = useBoardStore();

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // swaps the position of the task being dragged and the position of the task being displaced
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // swaps the position of the column being dragged and the position of the column being displaced
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        // triggers a re-render because a new array is being created
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <section className="m-auto flex flex-col-reverse gap-4">
          <section className="flex flex-wrap justify-center gap-8 md:gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <Lane key={col.id} column={col} />
              ))}
            </SortableContext>
          </section>
          <button
            onClick={createNewColumn}
            className="h-[60px] max-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2  p-4 flex justify-center gap-2 button mx-auto items-center"
          >
            <AddCircle size="32" color="#000000" /> Add Column
          </button>

          {typeof document !== "undefined" &&
            createPortal(
              <DragOverlay style={{ touchAction: "none" }}>
                {activeColumn && <Lane column={activeColumn} />}
                {activeTask && <Card task={activeTask} />}
              </DragOverlay>,
              document.body
            )}
        </section>
      </DndContext>
    </>
  );
};

export default Board;

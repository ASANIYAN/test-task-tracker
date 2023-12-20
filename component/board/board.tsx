"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, rectIntersection, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { AddCircle } from "iconsax-react";

import { Column, Id, Task } from "@/types/types";
import { generateId } from "@/utils/functions";

import Lane from "../lane/lane";
import Card from "../card/card";


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


const defaultTasks: Task[] = [];

const Board = () => {

const [columns, setColumns] = useState<Column[]>(defaultCols);
const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

const [tasks, setTasks] = useState<Task[]>(defaultTasks);

const [activeColumn, setActiveColumn] = useState<Column | null>(null);
const [activeTask, setActiveTask] = useState<Task | null>(null);

const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3,
        },
    })
)



const createTask = (columnId: Id) => {
    const newTask: Task = {
        id: generateId(),
        columnId,
        content: `Task description ${tasks.length + 1}`,
        date: new Date(),
        name: `Task name ${tasks.length + 1}`
    };

    setTasks([...tasks, newTask]);
}

const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
}

const updateTask = (id: Id, content: string, name: string) => {
    const newTasks = tasks.map(task => {
        if (task.id !== id) return task;
        return { ...task, content, name };
    });

    setTasks(newTasks);
}

const createNewColumn = () => {
    const columnToAdd: Column = {
        id: generateId(),
        title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
}

const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId != id);
    setTasks(newTasks);
}

const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
    });

    setColumns(newColumns);
}

const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
        setActiveColumn(event.active.data.current.column);
        return;
    }

    if (event.active.data.current?.type === "Task") {
        setActiveTask(event.active.data.current.task);
        return;
    }
}

const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
            (col) => col.id === activeId
        );

        const overColumnIndex = columns.findIndex(
            (col) => col.id === overId
        );

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
}



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


}


    return (
        <>
            <DndContext
                sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}
            >
                <section className="m-auto flex flex-col-reverse gap-4">
                    <section className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-4">
                            <SortableContext items={columnsId}>
                                {
                                    columns.map((col) => (
                                        <Lane 
                                            key={col.id} 
                                            column={col} 
                                            deleteColumn={deleteColumn} 
                                            updateColumn={updateColumn} 
                                            createTask={createTask} 
                                            tasks={tasks.filter((task) => task.columnId === col.id)} 
                                            deleteTask={deleteTask} 
                                            updateTask={updateTask} 
                                        />
                                        ))
                                    }
                            </SortableContext>
                        </section>
                        <button
                            onClick={createNewColumn}
                            className="h-[60px] max-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2  p-4 flex justify-center gap-2 button mx-auto items-center"
                        >
                            <AddCircle size="32" color="#000000"/> Add Column
                        </button>

                        {  typeof document !== 'undefined' && createPortal(
                            <DragOverlay>
                                {
                                    activeColumn && 
                                    <Lane 
                                        column={activeColumn} 
                                        deleteColumn={deleteColumn} 
                                        updateColumn={updateColumn}
                                        createTask={createTask} 
                                        deleteTask={deleteTask} 
                                        updateTask={updateTask}
                                        tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                                    />
                                }
                                {
                                    activeTask && 
                                    <Card 
                                        deleteTask={deleteTask} 
                                        updateTask={updateTask} 
                                        task={activeTask} 
                                    />
                                }
                            </DragOverlay>, 
                            document.body
                        )}
                </section>
            </DndContext>
        </>

    );
}
 
export default Board;
import { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from '@/types/types';
import { Trash } from "iconsax-react";

interface TaskCardProps {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

const Card = ({ task, deleteTask, updateTask }: TaskCardProps) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const ToggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return <section ref={setNodeRef} 
        style={style} className='bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border border-black cursor-grab relative opacity-30'/>
    }

    if (editMode) {
        return (   <section ref={setNodeRef} 
            style={style}
            {...attributes}
            {...listeners}
            className='bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-black cursor-grab relative'
    >
        <textarea className='h-[90%] w-full resize-none border-none rounded bg-transparent focus:outline-none' value={task.content} autoFocus placeholder='Task content here'
        onBlur={ToggleEditMode} onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) ToggleEditMode();
        }} 
        onChange={(e) => updateTask(task.id, e.target.value)}></textarea>
    </section>)
    }

    return (
        <section ref={setNodeRef} 
        style={style}
        {...attributes}
        {...listeners}
        
        onClick={ToggleEditMode} className='bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-black cursor-grab relative task'
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}

            onMouseLeave={() => {
                setMouseIsOver(false);
            }}

        >
             <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>{task.content}</p>
               
            {mouseIsOver && (<button onClick={() => {
                deleteTask(task.id);
            }}
            
            className='absolute right-4 top-1/2 -translate-y-1/2  p-2 rounded opacity-60 hover:opacity-100'><Trash size="32" color="#000000"/></button>)}
        </section>
    )
}

export default Card;
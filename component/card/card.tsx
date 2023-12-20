import { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Id, Task } from '@/types/types';
import { Edit2, Trash } from "iconsax-react";
import { getDayMonthYearTime } from '@/utils/functions';
import EditModal from '../modal/edit-modal';

interface TaskCardProps {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string, name: string) => void;
}

const Card = ({ task, deleteTask, updateTask }: TaskCardProps) => {
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

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
        style={style} 
        className='p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border border-black cursor-grab relative opacity-30' 
        />
    }

    const handleEditModalClose = () => setModal(false);

    // if (editMode) {
    //     return (   <section ref={setNodeRef} 
    //         style={style}
    //         {...attributes}
    //         {...listeners}
    //         className='p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-black cursor-grab relative'
    // >
    //     <textarea className='h-[90%] w-full resize-none border-none rounded bg-transparent focus:outline-none' value={task.content} autoFocus placeholder='Task content here'
    //     onBlur={ToggleEditMode} onKeyDown={(e) => {
    //         if (e.key === "Enter" && e.shiftKey) ToggleEditMode();
    //     }} 
    //     onChange={(e) => updateTask(task.id, e.target.value)}></textarea>
    // </section>)
    // }

    return (
        <>
            { modal &&
                <>
                    <section className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 overflow-hidden' />
                    <EditModal 
                        handleEditModalClose={handleEditModalClose}
                        task={task}
                        updateTask={updateTask}
                    />
                </> 
            }

        
            <section ref={setNodeRef} 
            style={style}
            {...attributes}
            {...listeners}
            
            onClick={ToggleEditMode} className='p-2.5 h-fit min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-black cursor-grab relative task'
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}

                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}

            >
                <section className='flex flex-col items-start gap-3 max-w-[250px] p-2'>
                    <p className=' w-full overflow-y-auto overflow-x-hidden text-lg font-semibold break-words'> {task.name} </p>
                    <p className=' w-full overflow-y-auto overflow-x-hidden text-base'>{task.content}</p>
                    <p className=' w-full overflow-y-auto overflow-x-hidden text-sm'> {getDayMonthYearTime(task.date)} </p>
                </section>
                
                {mouseIsOver &&
                    <section className=''>
                        <button onClick={() => deleteTask(task.id)}
                            
                        >
                            <Trash className='absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100' size={32} color="#000000"/>
                        </button>
                        <button>
                            <Edit2 onClick={() => setModal(true)} size={32} className='absolute right-4 top-[70%] -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100' color="#000000"/>
                        </button>
                    </section>
                }
            </section>
        </>
    )
}

export default Card;
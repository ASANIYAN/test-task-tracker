import { useState } from "react";
import { CloseSquare } from "iconsax-react";
import { Id, Task } from "@/types/types";
import { SuccessToast } from "../toast/toasts";

type EditModalProp = {
  handleEditModalClose: () => void;
  task: Task;
  updateTask: (id: Id, content: string, name: string, date: string) => void;
};

const EditModal = ({
  handleEditModalClose,
  task,
  updateTask,
}: EditModalProp) => {
  const [formData, setFormData] = useState({
    taskName: task.name === undefined ? "" : task.name,
    description: task.content === undefined ? "" : task.content,
    date: "",
  });
  const [formError, setFormError] = useState({
    taskName: false,
    description: false,
    date: false,
  });

  const handleEditClick = () => {
    const { taskName, description, date } = formData;
    const { id } = task;

    const isTaskNameEmpty = !taskName.trim();
    const isDescriptionEmpty = !description.trim();
    const isDateEmpty = date.length === 0;

    const errorState = {
      taskName: isTaskNameEmpty,
      description: isDescriptionEmpty,
      date: isDateEmpty,
    };

    if (isTaskNameEmpty || isDescriptionEmpty || isDateEmpty) {
      setFormError(errorState);
    } else {
      setFormError({ taskName: false, description: false, date: false });
    }

    if (!isTaskNameEmpty && !isDescriptionEmpty && !isDateEmpty) {
      updateTask(id, description, taskName, date);
      handleEditModalClose();
      SuccessToast("Edit Successful");
    }
  };

  return (
    <section className="max-w-[500px] h-fit bg-white shadow-md rounded-md p-5 z-20 fixed inset-0 mx-auto my-auto">
      <section className="w-full flex justify-end">
        <CloseSquare
          onClick={handleEditModalClose}
          color="#000000"
          className="cursor-pointer"
        />
      </section>

      <section className="flex flex-col gap-4">
        <section className="w-full">
          <label htmlFor="taskName" className="">
            Name
          </label>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            className={`w-full border ${
              formError.taskName ? "border-red-600" : "border-black"
            } bg-transparent p-2 rounded mt-2.5 focus:outline-none`}
            value={formData.taskName}
            onChange={(e) =>
              setFormData({ ...formData, taskName: e.target.value })
            }
          />
        </section>
        <section>
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            name="description"
            className={`w-full border ${
              formError.description ? "border-red-600" : "border-black"
            } bg-transparent p-2 rounded mt-2.5 focus:outline-none`}
            placeholder="Task Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </section>
        <section>
          <label htmlFor="date" className="">
            Due Date
          </label>
          <input
            name="date"
            className={`w-full border ${
              formError.date ? "border-red-600" : "border-black"
            } bg-transparent p-2 rounded mt-2.5 focus:outline-none`}
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </section>
      </section>

      <section className="flex justify-center mt-4">
        <button
          className="px-5 py-2 border border-black rounded bg-black cursor-pointer hover:bg-white hover:text-black text-white transition"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </section>
    </section>
  );
};

export default EditModal;

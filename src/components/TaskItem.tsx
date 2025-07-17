import { Task } from "../types/task";

interface Props {
    task: Task;
    onUpdate: (id: number, status: Task["status"]) => void;
    onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onUpdate, onDelete }: Props) => {
    return (
        <div className="flex justify-between items-center border p-4 rounded-lg shadow-sm mb-2 bg-white">
            <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.status}</p>
            </div>
            <div className="flex gap-2">
                <select
                    className="text-sm border px-2 py-1 rounded"
                    value={task.status}
                    onChange={(e) => onUpdate(task.id, e.target.value as Task["status"])}
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(task.id)}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

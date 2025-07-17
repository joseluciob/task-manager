import { useState } from "react";

export const TaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
    const [title, setTitle] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle("");
    };

    return (
        <form onSubmit={submit} className="flex gap-2 my-4">
            <input
                type="text"
                className="flex-1 border rounded p-2"
                placeholder="New task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
            </button>
        </form>
    );
};

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../types/task";
import * as taskService from "../services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async (status?: TaskStatus) => {
        setLoading(true);
        const data = await taskService.getTasks(status);
        setTasks(data);
        setLoading(false);
    };

    const addTask = async (title: string) => {
        const newTask = await taskService.createTask(title);
        setTasks((prev) => [...prev, newTask]);
    };

    const changeStatus = async (id: number, status: TaskStatus) => {
        const updated = await taskService.updateTaskStatus(id, status);
        setTasks((prev) => prev.map(t => t.id === id ? updated : t));
    };

    const removeTask = async (id: number) => {
        await taskService.deleteTask(id);
        setTasks((prev) => prev.filter(t => t.id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, addTask, changeStatus, removeTask, fetchTasks };
};

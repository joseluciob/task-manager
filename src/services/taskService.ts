import axios from "axios";
import { Task, TaskStatus } from "../types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getTasks = async (status?: TaskStatus): Promise<Task[]> => {
  const params = status ? { status } : {};
  const res = await axios.get(`${API_URL}/tasks`, { params });
  return res.data;
};

export const createTask = async (title: string): Promise<Task> => {
  const res = await axios.post(`${API_URL}/tasks`, { title });
  return res.data;
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task> => {
  const res = await axios.patch(`${API_URL}/tasks/${id}`, { status });
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

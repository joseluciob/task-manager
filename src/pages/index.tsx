import Head from "next/head";
import { TaskItem } from "@/components/TaskItem";
import { TaskForm } from "@/components/TaskForm";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
    const { tasks, addTask, changeStatus, removeTask, loading } = useTasks();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head>
                <title>Task Manager</title>
            </Head>
            <main className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Tasks</h1>
                <TaskForm onAdd={addTask} />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={changeStatus}
                            onDelete={removeTask}
                        />
                    ))
                )}
            </main>
        </div>
    );
}

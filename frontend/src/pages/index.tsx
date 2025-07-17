import Head from "next/head";
import { Container, Typography, CircularProgress } from "@mui/material";
import { TaskItem } from "../components/TaskItem";
import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import {Task} from "@/types/task";

export default function Home() {
    const { tasks, addTask, changeStatus, removeTask, loading } = useTasks();

    return (
        <>
            <Head>
                <title>Task Manager</title>
            </Head>

            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Tasks
                </Typography>

                <TaskForm onAdd={addTask} />

                {loading ? (
                    <CircularProgress />
                ) : (
                    tasks.map((task: Task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={changeStatus}
                            onDelete={removeTask}
                        />
                    ))
                )}
            </Container>
        </>
    );
}

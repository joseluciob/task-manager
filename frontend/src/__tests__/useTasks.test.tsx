import { render, screen, waitFor } from "@testing-library/react";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";
import * as taskService from "../services/taskService";
import userEvent from "@testing-library/user-event";

jest.mock("../services/taskService");

const mockedTasks: Task[] = [
    { id: 1, title: "task 1", status: "pending" },
    { id: 2, title: "task 2", status: "in_progress" },
];

const TestComponent = () => {
    const { tasks, addTask, changeStatus, removeTask, loading } = useTasks();

    return (
        <div>
            {loading && <span>Loading...</span>}
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        {t.title} - {t.status}
                        <button onClick={() => changeStatus(t.id, "completed")}>Finish</button>
                        <button onClick={() => removeTask(t.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addTask("Nova Task")}>Add</button>
        </div>
    );
};

describe("useTasks hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (taskService.getTasks as jest.Mock).mockResolvedValue(mockedTasks);
        (taskService.createTask as jest.Mock).mockResolvedValue({
            id: 3,
            title: "Nova Task",
            status: "pending",
        });
        (taskService.updateTaskStatus as jest.Mock).mockImplementation((id, status) => ({
            id,
            title: `updated ${id}`,
            status,
        }));
        (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);
    });

    it("should load tasks on mount", async () => {
        render(<TestComponent />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("task 1 - pending")).toBeInTheDocument();
            expect(screen.getByText("task 2 - in_progress")).toBeInTheDocument();
        });
    });

    it("should add a task", async () => {
        render(<TestComponent />);
        const addButton = screen.getByText("Add");
        userEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText("Nova Task - pending")).toBeInTheDocument();
        });
    });

    it("should update task status", async () => {
        render(<TestComponent />);
        await waitFor(() => screen.getByText("task 1 - pending"));
        const finishButton = screen.getAllByText("Finish")[0];
        userEvent.click(finishButton);

        await waitFor(() => {
            expect(screen.getByText("updated 1 - completed")).toBeInTheDocument();
        });
    });

    it("should remove a task", async () => {
        render(<TestComponent />);
        await waitFor(() => screen.getByText("task 1 - pending"));
        const removeButton = screen.getAllByText("Remove")[0];
        userEvent.click(removeButton);

        await waitFor(() => {
            expect(screen.queryByText("task 1 - pending")).not.toBeInTheDocument();
        });
    });
});

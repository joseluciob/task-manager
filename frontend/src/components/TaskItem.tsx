import { Task } from "../types/task";
import {
    Box,
    Typography,
    IconButton,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    task: Task;
    onUpdate: (id: number, status: Task["status"]) => void;
    onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onUpdate, onDelete }: Props) => {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
                <Typography variant="subtitle1">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.status}
                </Typography>
            </Box>
            <Box display="flex" gap={2} alignItems="center">
                <Select
                    size="small"
                    value={task.status}
                    onChange={(e) => onUpdate(task.id, e.target.value as Task["status"])}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
                <IconButton color="error" onClick={() => onDelete(task.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

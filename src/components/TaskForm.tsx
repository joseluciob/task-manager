import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

export const TaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
    const [title, setTitle] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle("");
    };

    return (
        <Box component="form" onSubmit={submit} display="flex" gap={2} mb={4}>
            <TextField
                fullWidth
                label="New task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="contained" type="submit">
                Add
            </Button>
        </Box>
    );
};

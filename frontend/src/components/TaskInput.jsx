import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function TaskInput({ onAddTask, disabled }) {
  const [value, setValue] = useState("");

  // This function stops the form from reloading the page and adds a task.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }
    const isSuccess = await onAddTask(trimmedValue);
    if (isSuccess) {
      setValue("");
    }
  };

  // This layout shows the form where the user types a new task.
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        gap: 3,
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <Typography variant="h5" component="h2">
        Додати нове завдання
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <TextField
          label="Опис завдання"
          placeholder="Введіть текст завдання"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={disabled || !value.trim()}
        >
          Додати
        </Button>
      </Box>
    </Box>
  );
}

TaskInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

TaskInput.defaultProps = {
  disabled: false,
};

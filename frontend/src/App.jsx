import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TaskList from "./components/TaskList.jsx";
import TaskInput from "./components/TaskInput.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_TASKS_URL = `${API_BASE_URL}/api/tasks`;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasTasks = useMemo(() => tasks.length > 0, [tasks]);

  // This helper grabs the list of tasks from the server.
  const fetchTasks = useCallback(async ({ signal } = {}) => {
    try {
      setLoading(true);
      const response = await axios.get(API_TASKS_URL, { signal });
      const data = Array.isArray(response.data) ? response.data : [];
      setTasks(data);
      setFetchError("");
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        return;
      }
      setFetchError(
        error?.response?.data?.message ?? "Не вдалося завантажити завдання.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // This effect loads tasks as soon as the page opens.
  useEffect(() => {
    const controller = new AbortController();
    fetchTasks({ signal: controller.signal });
    return () => controller.abort();
  }, [fetchTasks]);

  // This function sends a new task to the server and updates the list.
  const handleAddTask = async (task) => {
    if (!task?.trim()) {
      setSubmitError("Текст завдання не може бути порожнім.");
      return false;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(API_TASKS_URL, { title: task.trim() });
      const newTask = response.data;
      setTasks((prev) => [...prev, newTask]);
      setSubmitError("");
      return true;
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ?? "Не вдалося додати завдання.",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSubmitError = () => setSubmitError("");

  // This layout shows the task list, the input, and any error messages.
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <TaskList
        tasks={tasks}
        loading={loading}
        error={fetchError}
        hasTasks={hasTasks}
        onRetry={() => fetchTasks()}
      />
      <TaskInput onAddTask={handleAddTask} disabled={isSubmitting} />
      <Snackbar
        open={Boolean(submitError)}
        autoHideDuration={4000}
        onClose={handleCloseSubmitError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSubmitError}
          severity="error"
          variant="filled"
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function TaskList({ tasks, loading, error, hasTasks, onRetry }) {
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
        gap: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Список завдань
      </Typography>
      {loading && <CircularProgress size={48} sx={{ marginTop: 4 }} />}
      {!loading && error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={onRetry}>
              Повторити
            </Button>
          }
          sx={{ alignSelf: "stretch", maxWidth: 480 }}
        >
          {error}
        </Alert>
      )}
      {!loading && !error && !hasTasks && (
        <Typography variant="body1" color="text.secondary">
          Завдань поки немає. Додайте перше!
        </Typography>
      )}
      {!loading && !error && hasTasks && (
        <List
          sx={{ width: "100%", maxWidth: 480, bgcolor: "background.paper" }}
        >
          {tasks.map((task, index) => {
            const content = task?.title ?? task?.name ?? task?.task ?? task;
            return (
              <ListItem key={task?.id ?? `${index}-${content}`} divider>
                <ListItemText primary={content} />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  hasTasks: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
};

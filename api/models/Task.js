import pool from "../config/database.js";

const Task = {
  // This function pulls every task from the database in newest-first order.
  async getAll() {
    const result = await pool.query(
      "SELECT id, title, created_at FROM tasks ORDER BY created_at DESC",
    );

    return result.rows;
  },

  // This function saves a task and gives back the stored row.
  async create({ title }) {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      const error = new Error("Task title is required");
      error.status = 400;
      throw error;
    }

    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, created_at",
      [trimmedTitle],
    );

    return result.rows[0];
  },
};

export default Task;

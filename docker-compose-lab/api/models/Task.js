import pool from "../config/database.js";

const Task = {
  async getAll() {
    const result = await pool.query(
      "SELECT id, title, created_at FROM tasks ORDER BY created_at DESC",
    );
    return result.rows;
  },

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

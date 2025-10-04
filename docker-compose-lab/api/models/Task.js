import pool from "../config/database.js";

const Task = {
  async getAll() {
    // mock data
    return [
      { id: 1, title: "First task" },
      { id: 2, title: "Second task" },
    ]; // Повертаємо MOCK дані
    // const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    // return [];
    // return result.rows;
  },

  async create({ title }) {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      const error = new Error("Task title is required");
      error.status = 400;
      throw error;
    }

    console.log('*** RESULT ***: ', trimmedTitle);
    

    return trimmedTitle;
  },
};

export default Task;

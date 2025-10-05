import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

// This request returns every saved task.
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// This request creates a brand-new task.
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body || {});
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

export default router;

import { Hono } from "hono";
import TaskController from "../controllers/task.controller";

const taskRoute = new Hono();

taskRoute.get('/', TaskController.getTasks)
taskRoute.post('/', TaskController.createTask)

taskRoute.get('/:id', TaskController.getTask)
taskRoute.patch('/:id', TaskController.updateTask)
taskRoute.delete('/:id', TaskController.deleteTask)

export default taskRoute
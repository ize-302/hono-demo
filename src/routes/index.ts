import { Hono } from "hono";
import taskRoute from "@/routes/task.routes";

const apiRoute = new Hono();

apiRoute.route('/tasks', taskRoute)

export default apiRoute
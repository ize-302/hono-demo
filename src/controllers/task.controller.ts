import { Context } from "hono"
const sql = require('@/connect')

class TaskController {
  static async getTasks(c: Context) {
    const tasks = await sql`
      SELECT
        *
      FROM
        tasks;
    `;
    return c.json(tasks)
  }

  static async createTask(c: Context) {
    const body = await c.req.raw.clone().json()
    const result = await sql`
      INSERT INTO
        tasks
      ${sql({ name: body.name})}
    `
    if (result)
      return c.json({message: 'New task added'}, 201)
  }

  static async getTask(c: Context) {
    const { id } = c.req.param()
    const [task] = await sql`
      SELECT
        *
      FROM
        tasks
      WHERE
      id = ${id};
    `;
    if (task)
      return c.json(task)
    else return c.json({error: "not found"}, 404)
  }

  static async updateTask(c: Context) {
    const body = await c.req.raw.clone().json()
    const { id } = c.req.param()
    const result = await sql`
      UPDATE
        tasks
      SET
        ${sql(body, 'name', 'status')}
      WHERE 
        id = ${id};
    `
    if (result)
      return c.json({message: 'task updated'})
  }

  static async deleteTask(c: Context) {
    const { id } = c.req.param()
    const result = await sql`
      DELETE FROM
        tasks
      WHERE
        id = ${id};
    `;
    if (result)
      return c.json({message: 'Deleted'})
  }
}

export default TaskController
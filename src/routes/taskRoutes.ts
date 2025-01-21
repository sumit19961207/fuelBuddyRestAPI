import { FastifyInstance } from 'fastify';
import { createTask, getTaskById, listTasks, updateTask, deleteTask } from '../controllers/taskController';


export const taskRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/savetasks', createTask);
  fastify.get('/fetchtasks', listTasks);
  fastify.get('/fetchtasks/:id', getTaskById);
  fastify.put('/updatetasks/:id', updateTask);
  fastify.delete('/deletetasks/:id', deleteTask);
};
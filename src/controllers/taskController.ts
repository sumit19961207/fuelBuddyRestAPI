import { FastifyReply, FastifyRequest } from 'fastify';
import { Task } from '../entities/Task';
import { AppDataSource } from "../db/connection";

interface CreateTaskRequest {
    title: string;
    description: string;
    status: string;
  }

  interface UpdateTaskRequest {
    title: string;
    description: string;
    status: string;
  }


  interface Params {
    id: number;
  }



export const createTask = async(request:FastifyRequest<{ Body: CreateTaskRequest }>,reply:FastifyReply)=>{
    const {title,description,status} = request.body;
    if (!title || !description || !status) {
        return reply.status(400).send({ message: 'Missing required fields' });
      }

      const taskRepository = AppDataSource.getRepository(Task);
      const task = taskRepository.create({title,description,status});
      await taskRepository.save(task);
      return reply.status(201).send(task);

    //   return reply.status(201).send("OK");
}


export const getTaskById = async(request:FastifyRequest<{ Params: Params }>,reply:FastifyReply) => {
    const id = request.params;
    const taskId = Number(id);
    
    if (isNaN(taskId)) {
        return reply.status(400).send({ message: 'Invalid task ID' });
    }
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
        where: { id: taskId } 
    });
    if (!task) {
        return reply.status(404).send({ message: 'Task not found' });
      }
    
      return reply.send(task);
} 

export const listTasks = async (request: FastifyRequest, reply: FastifyReply) => {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find();
    return reply.send(tasks);
  };

export const updateTask = async (request: FastifyRequest<{Params:Params, Body: UpdateTaskRequest }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { title, description, status } = request.body;
  
    if (!title || !description || !status) {
      return reply.status(400).send({ message: 'Missing required fields' });
    }
  
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({ id });
  
    if (!task) {
      return reply.status(404).send({ message: 'Task not found' });
    }
  
    task.title = title;
    task.description = description;
    task.status = status;
    await taskRepository.save(task);
  
    return reply.send(task);
  };
  
  // Delete a task
  export const deleteTask = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    const { id } = request.params;
  
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({ id });
  
    if (!task) {
      return reply.status(404).send({ message: 'Task not found' });
    }
  
    await taskRepository.remove(task);
    return reply.status(204).send({message :`${id} task deleted`});
  };

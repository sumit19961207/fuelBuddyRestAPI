import "reflect-metadata";
import { DataSource   } from "typeorm";
import { Task } from "../entities/Task";

export const AppDataSource = new DataSource({
    type: "postgres",           
    host: "localhost",          
    port: 5432,                 // Port number for PostgreSQL
    username: "postgres",           // PostgreSQL username
    password: "Hima8574",       // Correct password to connect to the database
    database: "fuelBuddy",           // Name of the database to connect to
    synchronize: true,          // Automatically create the database schema
    logging: true,              // Log SQL queries
    entities: [Task],           // Include the Task entity for ORM mapping
    subscribers: [],
    migrations: [],
}) 
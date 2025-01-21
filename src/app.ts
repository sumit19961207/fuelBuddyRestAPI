import Fastify from "fastify";
import { taskRoutes } from "./routes/taskRoutes";
import { AppDataSource } from "./db/connection";



const server = Fastify();

server.get('/healthcheck', async function () {
    return{status:"ok"}
})

server.register(taskRoutes)
async function main() {
    try{
      await AppDataSource.initialize();
      await server.listen(3000, '0.0.0.0')
      console.log(`server ready at http://localhost:3000`)
    }catch(e){
      console.log(e);
      process.exit(1);
    }
}

main()
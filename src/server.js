import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import authRoutes from "../src/auth/authRoutes.js";
import { errorHandler } from "./errors/errorHandler.js";

const app = fastify();
dotenv.config();
app.register(cors, {
    origin: '*'
})

app.register(authRoutes)
app.setErrorHandler(errorHandler);

app.listen({ port: process.env.PORT || 3000 }).then(() => {

    console.log('Server running on PORT:  ' +  process.env.PORT)
})


//Rota para test(excluir dps)
app.post('/test', async (req, reply) => {
  console.log('Body /test:', req.body);
  return { received: req.body };
});
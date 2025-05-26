import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import authRoutes from "../src/auth/authRoutes.js";
import { errorHandler } from "./errors/errorHandler.js";
import userRoutes from "./user/userRoutes.js";
import adminRoutes from "./admin/adminRoutes.js";
import publicPositionRoutes from "./positions/positionRoutes.js";
import profileRoutes from "./me/profileRoutes.js";
import applicationRoutes from "./user/application/applicationRoutes.js";
const app = fastify();
dotenv.config();
app.register(cors, {
    origin: '*'
})

//Routes
app.register(authRoutes)
app.register(userRoutes)
app.register(adminRoutes)
app.register(publicPositionRoutes);
app.register(profileRoutes);
app.register(applicationRoutes);

//Middleware
app.setErrorHandler(errorHandler);


app.listen({ port: process.env.PORT || 3000 }).then(() => {

    console.log('Server running on PORT:  ' +  process.env.PORT)
})


//Rota para test(excluir dps)
app.post('/test', async (req, reply) => {
  console.log('Body /test:', req.body);
  return { received: req.body };
});
import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import authRoutes from "../src/auth/authRoutes.js";

const app = fastify();

dotenv.config();

app.register(cors, {
    origin: '*'
})

app.register(authRoutes)

app.listen({ port: process.env.PORT || 3000 }).then(() => {

    console.log('Server running on PORT:  ' +  process.env.PORT)
})
